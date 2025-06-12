package com.cozycare.cozycare_app.annotation;


import com.cozycare.cozycare_app.validators.PrimaryCarePhysicianValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PrimaryCarePhysicianValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidatePhysicianName {
    String message() default "Invalid physician name";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
