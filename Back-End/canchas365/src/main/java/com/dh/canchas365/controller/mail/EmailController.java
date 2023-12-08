package com.dh.canchas365.controller.mail;

import com.dh.canchas365.dto.mail.EmailDto;
import com.dh.canchas365.exceptions.CustomFieldException;
import com.dh.canchas365.service.mail.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController extends CustomFieldException {

    @Autowired
    private IEmailService service;

    @PostMapping("/sendMessage")
    public ResponseEntity<?> requestEmail(@RequestBody EmailDto emailDto) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(service.sendEmail(emailDto.getToUser(), emailDto.getSubject(), emailDto.getMessage()));
        } catch (Exception ex) {
            return customResponseError("Error a la hora de enviar el mail", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
