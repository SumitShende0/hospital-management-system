package com.cozycare.cozycare_app.exception;

public class InvalidAppointmentDateException extends RuntimeException {
    public InvalidAppointmentDateException(String message) {
        super(message);
    }
}
