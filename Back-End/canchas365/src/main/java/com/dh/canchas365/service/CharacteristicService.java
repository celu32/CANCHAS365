package com.dh.canchas365.service;

import com.dh.canchas365.exceptions.CustomFieldException;
import com.dh.canchas365.model.Characteristic;
import com.dh.canchas365.model.Club;
import com.dh.canchas365.repository.CharacteristicRepository;
import com.dh.canchas365.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CharacteristicService extends CustomFieldException {
    @Autowired
    private CharacteristicRepository repository;

    @Autowired
    private ClubRepository clubRepository;

    public List<Characteristic> getAll(){
        return repository.findAll();
    }
    public Characteristic create(Characteristic characteristic){
        return repository.save(characteristic);
    }

    public Characteristic update(Characteristic characteristic) {
        Optional<Characteristic> optional = findById(characteristic.getId());
        var update = optional.get();
        update.setName(characteristic.getName());
        update.setUrl(characteristic.getUrl());
        return repository.save(update);
    }

    public void delete(Long id) {
        Optional<Club> optional = clubRepository.clubCaracteristicInUse(id);
        if(optional.isPresent()) {
            throw  new IllegalArgumentException("La caracteristica esta siendo usada");
        }
        repository.deleteById(id);
    }

    public Optional<Characteristic> findById(Long id){
        return repository.findById(id);
    }

}
