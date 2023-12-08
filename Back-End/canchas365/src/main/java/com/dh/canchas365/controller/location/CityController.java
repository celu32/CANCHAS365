package com.dh.canchas365.controller.location;

import com.dh.canchas365.dto.location.CityCreateDTO;
import com.dh.canchas365.dto.location.CityDTO;
import com.dh.canchas365.model.location.City;
import com.dh.canchas365.service.location.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/city")
public class CityController {

    @Autowired
    private CityService cityService;

    @PostMapping
    public ResponseEntity<City> createCity(@RequestBody CityCreateDTO dto){
        return new ResponseEntity<City>(cityService.createCity(dto), HttpStatus.CREATED);

    }

    @GetMapping
    public List<CityDTO> getAllCities(){
        return cityService.getAllCities();
    }
}
