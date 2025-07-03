package com.cozycare.cozycare_app.controller;

import com.cozycare.cozycare_app.dto.JwtResponse;
import com.cozycare.cozycare_app.entity.RefreshToken;
import com.cozycare.cozycare_app.entity.User;
import com.cozycare.cozycare_app.service.JwtService;
import com.cozycare.cozycare_app.service.RefreshTokenService;
import com.cozycare.cozycare_app.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class UserController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    JwtService jwtService;

    @Autowired
    RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User userRequest) {

        try {
            // Check if user exists first
            User user = userService.findByEmail(userRequest.getUserEmail());
            if (user == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Email not registered");
                return ResponseEntity.status(401).body(error);
            }

            // Try authenticating the user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userRequest.getUserEmail(), userRequest.getUserPassword())
            );

            if (authentication.isAuthenticated()) {
                // Generate JWT token and refresh token
                //Delete old refresh token if exist
                Optional<RefreshToken> existingRefreshToken = refreshTokenService.checkRefreshToken(user);
                existingRefreshToken.ifPresent(rt -> refreshTokenService.deleteRefreshToken(rt));

                RefreshToken refreshToken = refreshTokenService.createRefreshToken(userRequest.getUserEmail());

                ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken.getToken())
                        .httpOnly(true)
                        .secure(false) // use true in production
                        .sameSite("Lax")
                        .path("/")
                        .maxAge(7 * 24 * 60 * 60)
                        .build();


                String jwt = jwtService.generateToken(
                        user.getUserEmail(),
                        user.getUserRole()
                );

                // Prepare response


                return ResponseEntity.ok()
                        .header(HttpHeaders.SET_COOKIE, cookie.toString())
                        .body(new JwtResponse(jwt));
            } else {
                // Just in case
                Map<String, String> error = new HashMap<>();
                error.put("message", "Invalid credentials");
                return ResponseEntity.status(401).body(error);
            }

        } catch (Exception ex) {
            // Incorrect password or authentication failure
            Map<String, String> error = new HashMap<>();
            error.put("message", "Password does not match");
            return ResponseEntity.status(401).body(error);
        }
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<JwtResponse> refreshToken(HttpServletRequest request) {
        // Get refresh token from the cookie
        Cookie[] cookies = request.getCookies();

        String refreshTokenValue = null;

        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("refresh_token".equals(c.getName())) {
                    refreshTokenValue = c.getValue();
                    break;
                }
            }
        }

        if (refreshTokenValue == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // or throw
        }

        String finalRefreshTokenValue = refreshTokenValue;
        return refreshTokenService.findByToken(refreshTokenValue)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String newAccessToken = jwtService.generateToken(user.getUserEmail(), user.getUserRole());

                    ResponseCookie cookie = ResponseCookie.from("refresh_token", finalRefreshTokenValue)
                            .httpOnly(true)
                            .secure(true)
                            .sameSite("Strict")
                            .path("/")
                            .maxAge(7 * 24 * 60 * 60)
                            .build();

                    return ResponseEntity.ok()
                            .header(HttpHeaders.SET_COOKIE, cookie.toString())
                            .body(new JwtResponse(newAccessToken));
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null));
    }
}
