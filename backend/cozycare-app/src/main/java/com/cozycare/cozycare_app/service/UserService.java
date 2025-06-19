package com.cozycare.cozycare_app.service;

import com.cozycare.cozycare_app.entity.User;
import com.cozycare.cozycare_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    UserRepository userRepository;

    public User findByEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    public String encodePassword(String password) {
        return encoder.encode(password);
    }


}
