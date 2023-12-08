package com.dh.canchas365.model.location;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table
public class Address implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String street;

    @Column(nullable = false)
    private Integer number;

    private Integer floor;

    @Column(length = 45)
    private String apartment;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "id_city", nullable = false)
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnoreProperties(value = {"applications", "hibernateLazyInitializer"})
    private City city;

}
