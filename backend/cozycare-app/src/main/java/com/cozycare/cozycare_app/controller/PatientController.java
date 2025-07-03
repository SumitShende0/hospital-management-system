package com.cozycare.cozycare_app.controller;


import com.cozycare.cozycare_app.dto.JwtResponse;
import com.cozycare.cozycare_app.dto.PatientRegisterDTO;
import com.cozycare.cozycare_app.entity.Patient;
import com.cozycare.cozycare_app.entity.RefreshToken;
import com.cozycare.cozycare_app.entity.User;
import com.cozycare.cozycare_app.model.Role;
import com.cozycare.cozycare_app.service.JwtService;
import com.cozycare.cozycare_app.service.PatientService;
import com.cozycare.cozycare_app.service.RefreshTokenService;
import com.cozycare.cozycare_app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("patient")
    public ResponseEntity<JwtResponse> registerPatient(@Valid @RequestBody PatientRegisterDTO patient) {
        User user = userService.findByEmail(patient.getEmail());
        //for duplicate key handle it in frontend also
        if (user != null) {
            throw new RuntimeException("User already exist with same email");
        }

        user = new User();
        user.setUserEmail(patient.getEmail());
        user.setUserPassword(userService.encodePassword(patient.getPassword()));
        user.setUserRole(Role.PATIENT.name());


        Patient savedPatient = patientService.registerPatient(patient, user);

        User savedUser = savedPatient.getUser();
        // Generate token after saving
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(savedPatient.getEmail());
        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken.getToken())
                .httpOnly(true)
                .secure(true) // use true in production
                .sameSite("Lax")
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();

        String jwt = jwtService.generateToken(
                savedUser.getUserEmail(),
                savedUser.getUserRole()
        );
        // Return same response as login


        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new JwtResponse(jwt));
    }

}
