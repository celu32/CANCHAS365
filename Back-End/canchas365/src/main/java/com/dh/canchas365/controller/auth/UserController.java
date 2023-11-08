package com.dh.canchas365.controller.auth;

import com.dh.canchas365.dto.auth.CrearUsuarioDTO;
import com.dh.canchas365.dto.auth.LoginAttemp;
import com.dh.canchas365.dto.auth.UsuarioDto;
import com.dh.canchas365.exceptions.CustomFieldException;
import com.dh.canchas365.model.emun.ERol;
import com.dh.canchas365.model.auth.Rol;
import com.dh.canchas365.model.auth.Usuario;
import com.dh.canchas365.repository.auth.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController extends CustomFieldException {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/hello")
    public String hello(){
        return "Hello world sin seguridad";
    }

    @GetMapping("/helloSecured")
    public String helloSecured(){
        return "Hello world SEGURO";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> create(@Valid @RequestBody CrearUsuarioDTO crearUsuarioDto, BindingResult bindingResult){
        try {
            if(bindingResult.hasErrors()) {
                return validate(bindingResult);
            }
            Set<Rol> roles = crearUsuarioDto.getRoles().stream()
                    .map(role -> Rol.builder().name(ERol.valueOf(role)).build())
                    .collect(Collectors.toSet());

            Usuario usuario = Usuario.builder()
                    .name(crearUsuarioDto.getName())
                    .lastname(crearUsuarioDto.getLastname())
                    .username(crearUsuarioDto.getUsername())
                    .password(passwordEncoder.encode(crearUsuarioDto.getPassword()))
                    //.operador(operadorService.getOperadorById(crearUsuarioDto.getOperador()))
                    .roles(roles)
                    .build();

            usuarioRepository.save(usuario);

            return ResponseEntity.ok(usuario);
        } catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@RequestParam Long id) {
        try {
            Optional<?> optional = usuarioRepository.findById(id);
            if(optional.isPresent()) {
                usuarioRepository.deleteById(id);
                return customResponseError("Categoria Eliminada exitosamente", HttpStatus.OK);
            } else {
                return customResponseError("El id ingresado no existe", HttpStatus.NOT_FOUND);
            }
        }catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/signin")
    public ResponseEntity<?> getUsuario(@RequestBody LoginAttemp loginAttemp){
        try {
            Optional optional = usuarioRepository.findByUsername(loginAttemp.getUsername());
            Usuario usuario = null;
            UsuarioDto usuarioDto = null;
            if(!optional.isEmpty()){
                usuario = (Usuario) optional.get();
                usuarioDto = new UsuarioDto();
                usuarioDto.setId(usuario.getId());
                usuarioDto.setUsername(usuario.getUsername());
                usuarioDto.setName(usuario.getName());
                usuarioDto.setLastname(usuario.getLastname());
                //usuarioDto.setOperador(usuario.getOperador());
//            usuarioDto.setUsername(usuario.getUsername());
                return ResponseEntity.ok(usuarioDto);
            }
            return null;
        }
        catch (Exception ex) {
            return customResponseError("No existe usuario con el username "+loginAttemp.getUsername(),HttpStatus.BAD_REQUEST);
        }
    }
}