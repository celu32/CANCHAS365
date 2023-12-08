package com.dh.canchas365.controller.location;

import com.dh.canchas365.dto.location.AddressDTO;
import com.dh.canchas365.model.location.Address;
import com.dh.canchas365.service.location.AdressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AdressService adressService;

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody AddressDTO dto){
        return new ResponseEntity<Address>(adressService.createAddress(dto), HttpStatus.CREATED);
    }
}
