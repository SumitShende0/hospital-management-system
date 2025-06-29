package com.cozycare.cozycare_app.controller;

import com.cozycare.cozycare_app.dto.JwtResponse;
import com.cozycare.cozycare_app.dto.RefreshTokenRequest;
import com.cozycare.cozycare_app.entity.RefreshToken;
import com.cozycare.cozycare_app.entity.User;
import com.cozycare.cozycare_app.service.JwtService;
import com.cozycare.cozycare_app.service.RefreshTokenService;
import com.cozycare.cozycare_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
                String jwt = jwtService.generateToken(
                        user.getUserEmail(),
                        user.getUserRole()
                );

                // Prepare response


                return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken()));
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
    public JwtResponse refreshToken(@RequestBody() RefreshTokenRequest request) {
        return refreshTokenService.findByToken(request.getRefreshToken())
                .map(refreshToken -> refreshTokenService.verifyExpiration(refreshToken))
                .map(refreshToken -> refreshToken.getUser())
                .map(user -> {
                    String token = jwtService.generateToken(user.getUserEmail(), user.getUserRole());
                    return new JwtResponse(token, request.getRefreshToken());
                }).orElseThrow(() -> new RuntimeException("Refresh Token is not exist"));
    }
}
