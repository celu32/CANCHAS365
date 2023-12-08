package com.dh.canchas365.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Category implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 45, nullable = false, unique = true)
    @NotEmpty(message = "El titulo es obligatorio")
    private String title;

    @Column(length = 255, nullable = false)
    @NotEmpty(message = "la description es obligatoria")
    private String description;

    @Column(length = 255, nullable = false)
    private String url;

    @JsonIgnore
    @OneToMany( mappedBy = "category", cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private Set<Club> clubs = new HashSet<>();
}
