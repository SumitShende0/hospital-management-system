package com.cozycare.cozycare_app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AppointmentCancelDTO {

    @NotBlank(message = "Reason for cancellation required")
    private String reasonForCancellation;
}
