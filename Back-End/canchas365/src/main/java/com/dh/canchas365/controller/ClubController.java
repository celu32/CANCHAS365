package com.dh.canchas365.controller;

import com.dh.canchas365.dto.ClubCreateDTO;
import com.dh.canchas365.dto.ClubDTO;
import com.dh.canchas365.dto.SearchDto;
import com.dh.canchas365.exceptions.CustomFieldException;
import com.dh.canchas365.exceptions.ResourceDuplicateException;
import com.dh.canchas365.exceptions.ResourceNotFoundException;
import com.dh.canchas365.model.Category;
import com.dh.canchas365.model.Club;
import com.dh.canchas365.service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/club")
public class ClubController extends CustomFieldException {

    @Autowired
    private ClubService clubService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> createClub(@RequestBody ClubCreateDTO dto){
        try {
            return new ResponseEntity<>(clubService.createClub(dto), HttpStatus.CREATED);
        } catch (ResourceDuplicateException e) {
            return customResponseError(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping()
    public List<ClubDTO> getAllClubs(){
        return clubService.getAllClubs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClubById(@PathVariable("id") Long id){
        try {
            ClubDTO club = clubService.findById(id);
            if(club == null) {
                return customResponseError("El id ingresado no existe", HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(club);

        } catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<ClubDTO> updateClub(@RequestBody Club club) throws ResourceNotFoundException {
        ResponseEntity<ClubDTO> responseEntity = null;

        if(clubService.findById(club.getId()) == null){
            responseEntity = new ResponseEntity<ClubDTO>(HttpStatus.NOT_FOUND);
            throw new ResourceNotFoundException("No existe club con el id "+club.getId());
        }
        else{
            responseEntity = new ResponseEntity<ClubDTO>(clubService.updateClub(club), HttpStatus.OK);
        }
        return responseEntity;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ClubDTO>  deleteClub(@PathVariable("id") Long id) throws ResourceNotFoundException {
        ResponseEntity<ClubDTO> responseEntity = null;
        ClubDTO club = clubService.findById(id);
        if( club == null){
            responseEntity = new ResponseEntity(HttpStatus.NOT_FOUND);
            throw new ResourceNotFoundException("No existe club con el id "+id);
        }
        else{
            clubService.deleteClub(club.getId());
            responseEntity = new ResponseEntity<ClubDTO>(HttpStatus.OK);
        }
        return responseEntity;
    }

    @GetMapping("/recommended")
    public List<ClubDTO> getClubsrecommended(){
        return clubService.getClubsRecommended();
    }

    @GetMapping("/random")
    public List<ClubDTO> getRandomClubs(){
        return clubService.getRandomClubs();
    }

    @PostMapping("/by-categories")
    public List<ClubDTO> getByCategories(@RequestBody List<Category> categories) {
        return clubService.getByCategories(categories);
    }

    @PostMapping("/search")
    public List<ClubDTO> search(@RequestBody SearchDto filters) {
        return clubService.search(filters);
    }
}
