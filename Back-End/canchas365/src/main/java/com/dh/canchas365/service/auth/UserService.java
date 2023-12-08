package com.dh.canchas365.service.auth;

import com.dh.canchas365.dto.CharacteristicDto;
import com.dh.canchas365.dto.ClubDTO;
import com.dh.canchas365.dto.auth.UsuarioDto;
import com.dh.canchas365.model.Characteristic;
import com.dh.canchas365.model.Club;
import com.dh.canchas365.model.auth.Rol;
import com.dh.canchas365.model.auth.Usuario;
import com.dh.canchas365.model.emun.ERol;
import com.dh.canchas365.repository.auth.RolRepository;
import com.dh.canchas365.repository.auth.UsuarioRepository;
import com.dh.canchas365.service.images.ImagesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private ImagesService imagesService;

    public Usuario getByUsername(String username) {
        Optional<Usuario> usuario = repository.findByUsername(username);
        return usuario.get();
    }

    public List<UsuarioDto> getAll() {
        var result = repository.findAll();
        List<UsuarioDto> usuarioDtos = new ArrayList<>();

        result.forEach(usuario -> {
            UsuarioDto usuarioDto = new UsuarioDto();
            usuarioDto.setId(usuario.getId());
            usuarioDto.setUsername(usuario.getUsername());
            usuarioDto.setName(usuario.getName());
            usuarioDto.setLastname(usuario.getLastname());
            usuarioDto.setRol(usuario.getRoles());
            usuarioDto.setIsAdmin(usuario.getRoles().stream().anyMatch(rol -> rol.getName() == ERol.ADMIN));
            usuarioDtos.add(usuarioDto);
        });

        return usuarioDtos;
    }

    public UsuarioDto updateRoles(Long id) {
        var usuario = repository.findById(id).orElse(null);
        boolean isAdmin = usuario.getRoles().stream().anyMatch(rol -> rol.getName() == ERol.ADMIN);
        Set<Rol> roles = new HashSet<>(usuario.getRoles());
        UsuarioDto usuarioDto = new UsuarioDto();

        if (isAdmin) {
            roles.removeIf(rol -> rol.getName() == ERol.ADMIN);
            usuarioDto.setIsAdmin(false);
        } else {
            Rol rolAdmin = rolRepository.findByName(ERol.ADMIN);
            roles.add(rolAdmin);
            usuarioDto.setIsAdmin(true);
        }
        usuario.setRoles(roles);
        repository.save(usuario);

        usuarioDto.setId(usuario.getId());
        usuarioDto.setUsername(usuario.getUsername());
        usuarioDto.setName(usuario.getName());
        usuarioDto.setLastname(usuario.getLastname());
        usuarioDto.setRol(usuario.getRoles());

        return usuarioDto;
    }

    public Set<ClubDTO> getFavorites(Long id) {
        ModelMapper mapper = new ModelMapper();
        Set<ClubDTO> clubesDTO = new HashSet<>();

        var user = repository.findById(id).orElse(null);

        ClubDTO clubDTO;
        for (Club club : user.getFavorites()) {
            clubDTO = mapper.map(club, ClubDTO.class);
            clubDTO.setImages(imagesService.getImagesByClub(club.getId()));

            clubesDTO.add(clubDTO);
        }

        return clubesDTO;
    };

    public void addFavoriteUser(Long id, ClubDTO favorite) {
        ModelMapper mapper = new ModelMapper();

        var user = repository.findById(id).orElse(null);
        if (user != null) {
            Set<Club> currentFavorites = user.getFavorites();

            Club club = mapper.map(favorite, Club.class);;

            Club existingClub = currentFavorites.stream()
                    .filter(c -> c.getId().equals(club.getId()))
                    .findFirst()
                    .orElse(null);

            if (existingClub == null) {
                currentFavorites.add(club);
            } else {
                currentFavorites.remove(existingClub);
            }

            user.setFavorites(currentFavorites);
            repository.save(user);
        }
    }
}
