package com.dh.canchas365.mail.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class MailConfiguration {
    @Value("${email.host}")
    private String emailHost;
    @Value("${email.sender}")
    private String emailSender;
    @Value("${email.password}")
    private String emailPassword;
    @Value("${email.port}")
    private int emailPort;

    @Bean
    public JavaMailSender getJavaMailSender() {
      var mailSender = new JavaMailSenderImpl();
      mailSender.setHost(emailHost);
      mailSender.setPort(emailPort);
      mailSender.setUsername(emailSender);
      mailSender.setPassword(emailPassword);

      var props = mailSender.getJavaMailProperties();
      props.put("mail.transport.protocol","smtp");
      props.put("mail.smtp.auth","true");
      props.put("mail.smtp.starttls.enable","true");
      props.put("mail.debug","true");

      return mailSender;
    };
}
