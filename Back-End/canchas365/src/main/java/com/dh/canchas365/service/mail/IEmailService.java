package com.dh.canchas365.service.mail;

import org.springframework.http.ResponseEntity;

public interface IEmailService {
    ResponseEntity<?> sendEmail(String toUser, String subject, String message);
}
