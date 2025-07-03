package com.cozycare.cozycare_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private String message;
    private int status;

    private Map<String, String> fieldErrors; // For validation errors


    // Additional constructor for general errors
    public ErrorResponse(LocalDateTime timestamp, String message, int status) {
        this(timestamp, message, status, null);
    }
}
