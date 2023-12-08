package com.dh.canchas365.service.location;

import com.dh.canchas365.dto.location.CityCreateDTO;
import com.dh.canchas365.dto.location.CityDTO;
import com.dh.canchas365.model.location.City;
import com.dh.canchas365.model.location.State;
import com.dh.canchas365.repository.location.CityRepository;
import com.dh.canchas365.repository.location.StateRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private StateRepository stateRepository;

    public City createCity(CityCreateDTO dto){
        City city = new City();
        city.setName(dto.getName());
        Optional<State> optionalState = stateRepository.findById(dto.getIdState());
        if(optionalState.isPresent()){
            city.setState(optionalState.get());
        }
        return cityRepository.save(city);
    }

    public List<CityDTO> getAllCities(){
        List<City> cities =  cityRepository.findAll();
        ModelMapper mapper = new ModelMapper();
        List<CityDTO> cityDTOS = new ArrayList<CityDTO>();
        for(City city: cities){
            cityDTOS.add(mapper.map(city, CityDTO.class));
        }
        return cityDTOS;
    }
}
