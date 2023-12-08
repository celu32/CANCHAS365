package com.dh.canchas365.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.io.Serializable;
@Entity
@Table(name = "Characteristics")
@Getter
@Setter
@NoArgsConstructor
public class Characteristic implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false, unique = true)
    @NotEmpty(message = "El nombre es obligatorio")
    private String name;

    @Column(length = 255, nullable = false)
    @NotEmpty(message = "la url es obligatoria")
    private String url;
}

    