package com.dh.canchas365.model.auth;

import com.dh.canchas365.model.Club;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user")
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotEmpty(message = "El nombre de usuario es obligatorio")
    @Column(length = 80, nullable = false, unique = true)
    private String username;

    @Column(length = 40, nullable = false)
    @NotEmpty(message = "El nombre es obligatoria")
    private String name;

    @Column(length = 40, nullable = false)
    @NotEmpty(message = "El apellido es obligatoria")
    private String lastname;

    @Column(length = 200, nullable = false)
    @NotEmpty(message = "La contraseña es obligatoria")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = Rol.class, cascade = CascadeType.ALL)
    @JoinTable(name = "user_rol", joinColumns = @JoinColumn(name = "id_user"), inverseJoinColumns = @JoinColumn(name = "id_rol"))
    private Set<Rol> roles;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "favorite", joinColumns = @JoinColumn(name = "id_user"), inverseJoinColumns = @JoinColumn(name = "id_club"))
    private Set<Club> favorites;
}
