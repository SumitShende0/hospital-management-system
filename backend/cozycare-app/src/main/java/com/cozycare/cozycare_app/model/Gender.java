package com.cozycare.cozycare_app.model;

public enum Gender {

    MALE,
    FEMALE,
    OTHER;

    public static Gender fromString(String value) {
        if (value == null) return null;
        return Gender.valueOf(value.trim().toUpperCase());
    }
}
