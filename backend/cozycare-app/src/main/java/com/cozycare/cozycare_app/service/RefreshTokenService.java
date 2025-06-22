package com.cozycare.cozycare_app.service;


import com.cozycare.cozycare_app.entity.RefreshToken;
import com.cozycare.cozycare_app.entity.User;
import com.cozycare.cozycare_app.repository.RefreshTokenRepository;
import com.cozycare.cozycare_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> checkRefreshToken(User user) {
        return refreshTokenRepository.findByUser(user);
    }

    public RefreshToken createRefreshToken(String userEmail) {
        RefreshToken refreshToken = RefreshToken.builder()
                .user(userRepository.findByUserEmail(userEmail))
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(600000))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public void deleteRefreshToken(RefreshToken refreshToken) {
        refreshTokenRepository.delete(refreshToken);
    }


    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException(token + "Refresh Token is expired");
        }
        return token;

    }
}
