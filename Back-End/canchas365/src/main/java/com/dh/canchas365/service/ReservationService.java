package com.dh.canchas365.service;

import com.dh.canchas365.dto.PlayingFieldDTO;
import com.dh.canchas365.dto.ReservationDto;
import com.dh.canchas365.dto.SearchReservationDTO;
import com.dh.canchas365.exceptions.ResourceNotFoundException;
import com.dh.canchas365.model.Category;
import com.dh.canchas365.model.PlayingField;
import com.dh.canchas365.model.Reservation;
import com.dh.canchas365.model.auth.Usuario;
import com.dh.canchas365.repository.PlayingFieldRepository;
import com.dh.canchas365.repository.ReservationRepository;
import com.dh.canchas365.repository.auth.UsuarioRepository;
import com.dh.canchas365.service.auth.UserService;
import com.dh.canchas365.service.mail.EmailService;
import jakarta.validation.constraints.Email;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private PlayingFieldRepository playingFieldRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ClubService clubService;

    @Autowired
    private EmailService emailService;

    public List<ReservationDto> searchReservationByClub(SearchReservationDTO searchReservationDTO){
        List<Reservation> reservations = new ArrayList<>();

        List<PlayingField> playingFieldsByClub = playingFieldRepository.getPlayingFieldsByClub(searchReservationDTO.getIdClub());
        for(PlayingField playingField: playingFieldsByClub){
            Optional<List<Reservation>> optionalReservations = reservationRepository.findByDateTimeAndClub(searchReservationDTO.getDateFrom(),
                    searchReservationDTO.getDateTo(), playingField);
            List<Reservation> reservationList = new ArrayList<>();
            if(optionalReservations.isPresent()){
                reservationList = optionalReservations.get();
            }

            for(Reservation reservation: reservationList){
                reservations.add(reservation);
            }

        }
        ModelMapper mapper = new ModelMapper();
        List<ReservationDto> reservationDtos = new ArrayList<ReservationDto>();
        for(Reservation rs: reservations){
            reservationDtos.add(mapper.map(rs, ReservationDto.class));
        }

        return reservationDtos;
    }

    public List<ReservationDto> getHistory(Long idUsuario) throws ResourceNotFoundException {
        List<Reservation> reservations = new ArrayList<>();

        Usuario usuario = new Usuario();
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(idUsuario);
        if(optionalUsuario.isPresent()){
            usuario = optionalUsuario.get();
        }
        else{
            throw new ResourceNotFoundException("El usuario con id "+idUsuario+" no existe");
        }

        Optional<List<Reservation>> optionalReservations = reservationRepository.findHistorial(LocalDateTime.now(), usuario);
        if(optionalReservations.isPresent()){
            reservations = optionalReservations.get();
        }

        ModelMapper mapper = new ModelMapper();
        List<ReservationDto> reservationDtos = new ArrayList<ReservationDto>();
        for(Reservation rs: reservations){
            reservationDtos.add(mapper.map(rs, ReservationDto.class));
        }
        return reservationDtos;
    }

    public Reservation create(ReservationDto reservationDto) throws ResourceNotFoundException {
        Reservation reservation =  new Reservation();

        Optional<PlayingField> optionalPlayingField = playingFieldRepository.findById(reservationDto.getPlayingField().getId());
        PlayingField playingField;
        if(optionalPlayingField.isPresent()){
            playingField = optionalPlayingField.get();
        }
        else{
            throw new ResourceNotFoundException("La cancha con id "+reservationDto.getId()+" no existe");
        }

        Usuario usuario = new Usuario();
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(reservationDto.getUsuario().getId());
        if(optionalUsuario.isPresent()){
            usuario = optionalUsuario.get();
        }
        else{
            throw new ResourceNotFoundException("El usuario con id "+reservationDto.getId()+" no existe");
        }

        reservation.setPlayingField(playingField);
        reservation.setUsuario(usuario);
        reservation.setStartDatetime(reservationDto.getStartDatetime());
        reservation.setEndDatetime(reservationDto.getEndDatetime());

        var saveReservation = reservationRepository.save(reservation);
        var message = emailService.buildMessageReservation(usuario,reservationDto,playingField);

        emailService.sendEmail(usuario.getUsername(), "Confirmacion de reserva",message);

        return saveReservation;
    }
    public Reservation update(Reservation reservation){
        Optional<Reservation> optional = findById(reservation.getId());
        var reservationUpdate = optional.get();
        reservationUpdate.setStartDatetime(reservation.getStartDatetime());
        reservationUpdate.setEndDatetime(reservation.getEndDatetime());
        return reservationRepository.save(reservationUpdate);
    }

    public void delete(Long id) {
        reservationRepository.deleteById(id);
    }

    public Optional<Reservation> findById(Long id){
        return reservationRepository.findById(id);
    }

    public List<Reservation> getAll(){
        return reservationRepository.findAll();
    }

}
