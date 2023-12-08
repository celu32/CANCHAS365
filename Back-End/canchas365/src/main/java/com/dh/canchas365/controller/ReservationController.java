package com.dh.canchas365.controller;
import com.dh.canchas365.dto.ReservationDto;
import com.dh.canchas365.dto.SearchReservationDTO;
import com.dh.canchas365.exceptions.CustomFieldException;
import com.dh.canchas365.exceptions.ResourceNotFoundException;
import com.dh.canchas365.model.Reservation;
import com.dh.canchas365.model.auth.Usuario;
import com.dh.canchas365.repository.ReservationRepository;
import com.dh.canchas365.service.ClubService;
import com.dh.canchas365.service.PlayingFieldService;
import com.dh.canchas365.service.ReservationService;
import com.dh.canchas365.service.auth.UserService;
import com.dh.canchas365.service.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservation")
public class ReservationController extends CustomFieldException {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    ReservationRepository reservationRepository;

    @Autowired
    private PlayingFieldService playingFieldService;

    @Autowired
    private UserService userService;

    @Autowired
    private ClubService clubService;
    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ReservationDto reservationDto, BindingResult bindingResult){
        try{
            if(bindingResult.hasErrors()) {
                return validate(bindingResult);
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(reservationService.create(reservationDto));

        } catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping
    public List<Reservation> getAll(){
        return reservationService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        try {
            Optional<Reservation> optional = reservationService.findById(id);
            if(optional.isPresent()){
                return ResponseEntity.ok(optional.get());
            }else {
                return customResponseError("El id ingresado no existe", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<?> update(@RequestBody Reservation reservation, BindingResult bindingResult){
        try {
            if(bindingResult.hasErrors()) {
                return validate(bindingResult);
            }

            return ResponseEntity.status(HttpStatus.OK).body(reservationService.update(reservation));
        }
        catch (Exception ex) {
            return customResponseError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            Optional<Reservation> optional = reservationService.findById(id);
            if(optional.isPresent()) {
                reservationService.delete(id);
                return ResponseEntity.status(HttpStatus.OK).body("Reserva Eliminada exitosamente");
            } else {
                return customResponseError("El id ingresado no existe", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/searchByClub")
    public List<ReservationDto> searchReservationByDateAndClub(@RequestBody SearchReservationDTO searchReservationDTO){
        return reservationService.searchReservationByClub(searchReservationDTO);
    }
    @GetMapping("/history/{idUsuario}")
    public List<ReservationDto> getHistorial(@PathVariable("idUsuario") Long idUsuario){
        try {
            return reservationService.getHistory(idUsuario);
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

}
