package com.dh.canchas365.dto.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class LoginAttemp implements Serializable {

    private String username;
    private String password;
}
