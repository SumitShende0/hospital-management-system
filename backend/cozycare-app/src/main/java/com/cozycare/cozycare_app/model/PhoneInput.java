package com.cozycare.cozycare_app.model;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhoneInput {

    @NotBlank(message = "Country code is required")
    @Pattern(regexp = "^\\+\\d{1,4}$", message = "Invalid country code (e.g. +91)")
    private String countryCode;
    private String dialCode;
    private String e164Number;
    private String internationalNumber;
    private String nationalNumber;
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "\\d{7,12}", message = "Phone number must be 7 to 12 digits")
    private String number;
}
