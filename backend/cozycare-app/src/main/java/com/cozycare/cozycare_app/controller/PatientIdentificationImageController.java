package com.cozycare.cozycare_app.controller;

import com.cozycare.cozycare_app.entity.PatientIdentificationImage;
import com.cozycare.cozycare_app.service.PatientIdentificationImageService;
import com.cozycare.cozycare_app.utility.ImageUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("api")
public class PatientIdentificationImageController {

    @Autowired
    private PatientIdentificationImageService patientIdentificationImageService;


    @PreAuthorize("hasRole('PATIENT')")
    @PostMapping("image/upload")
    public ResponseEntity<UUID> saveImage(@RequestParam MultipartFile file) throws IOException {
        PatientIdentificationImage image = PatientIdentificationImage.builder()
                .image(ImageUtility.compressBytes(file.getBytes()))
                .name(file.getName())
                .contentType(file.getContentType())
                .build();

        UUID uuid = patientIdentificationImageService.saveImage(image);

        return ResponseEntity.ok().body(uuid);

    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable UUID id) {
        Optional<PatientIdentificationImage> optional = patientIdentificationImageService.getImage(id);
        if (optional.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        PatientIdentificationImage image = optional.get();
        byte[] decompressed = ImageUtility.decompressBytes(image.getImage());

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, image.getContentType()).body(decompressed);

    }

}
