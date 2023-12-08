package com.dh.canchas365.controller.auth;

import com.dh.canchas365.dto.auth.RolDTO;
import com.dh.canchas365.model.emun.ERol;
import com.dh.canchas365.model.auth.Rol;
import com.dh.canchas365.repository.auth.RolRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rol")
public class RolController {

    @Autowired
    private RolRepository rolRepository;

    @PostMapping("/create")
    public ResponseEntity<?> crearRol(@Valid @RequestBody RolDTO rolDto){

        Rol rol = Rol.builder().name(ERol.valueOf(rolDto.getName())).build();

        rolRepository.save(rol);

        /*Usuario usuario = Usuario.builder()
                .username(crearUsuarioDto.getUsername())
                .email(crearUsuarioDto.getEmail())
                .password(passwordEncoder.encode(crearUsuarioDto.getPassword()))
                //.operador(operadorService.getOperadorById(crearUsuarioDto.getOperador()))
                .roles(roles)
                .build();

        usuarioRepository.save(usuario);*/

        return ResponseEntity.ok(rol);
    }

}
