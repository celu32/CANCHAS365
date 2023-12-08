package com.dh.canchas365.service.location;

import com.dh.canchas365.dto.location.AddressDTO;
import com.dh.canchas365.model.location.Address;
import com.dh.canchas365.model.location.City;
import com.dh.canchas365.repository.location.AddressRepository;
import com.dh.canchas365.repository.location.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CityRepository cityRepository;

    public Address createAddress(AddressDTO dto){
        Address address = new Address();
        address.setStreet(dto.getStreet());
        address.setNumber(dto.getNumber());
        address.setFloor(dto.getFloor());
        address.setApartment(dto.getApartment());
        Optional<City> optionalCity = cityRepository.findById(dto.getCity().getId());
        if(optionalCity.isPresent()){
            address.setCity(optionalCity.get());
        }

        return addressRepository.save(address);
    }

    public Address updateAddress(Address address){

        return addressRepository.save(address);
    }
}
