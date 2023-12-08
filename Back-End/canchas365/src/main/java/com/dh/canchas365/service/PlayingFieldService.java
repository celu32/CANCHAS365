package com.dh.canchas365.service;

import com.dh.canchas365.dto.ClubDTO;
import com.dh.canchas365.dto.PlayingFieldDTO;
import com.dh.canchas365.exceptions.ResourceNotFoundException;
import com.dh.canchas365.model.Category;
import com.dh.canchas365.model.Club;
import com.dh.canchas365.model.PlayingField;
import com.dh.canchas365.repository.ClubRepository;
import com.dh.canchas365.repository.PlayingFieldRepository;
import com.dh.canchas365.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlayingFieldService {

    @Autowired
    private PlayingFieldRepository playingFieldRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    public PlayingFieldDTO create(PlayingFieldDTO dto) throws ResourceNotFoundException {
        PlayingField playingField = new PlayingField();
        playingField.setDescription(dto.getDescription());

        Optional<Club> optionalClub = clubRepository.findById(dto.getIdClub());
        if(optionalClub.isPresent()){
            playingField.setClub(optionalClub.get());
        }
        else{
            throw new ResourceNotFoundException("No existe un club con el id "+dto.getIdClub());
        }

        Optional<Category> optionalSport = categoryRepository.findById(dto.getCategory().getId());
        if(optionalSport.isPresent()){
            playingField.setCategory(optionalSport.get());
        }
        else{
            throw new ResourceNotFoundException("No existe un deporte con el id "+dto.getCategory().getId());
        }
        ModelMapper mapper = new ModelMapper();
        return mapper.map(playingFieldRepository.save(playingField), PlayingFieldDTO.class);
    }

    public PlayingField updatePlayingField(PlayingField playingField){
        Optional<Category> category = categoryService.findById(playingField.getCategory().getId());
        Optional<Club> club = clubRepository.findById(playingField.getClub().getId());
        playingField.setCategory(category.get());
        playingField.setClub(club.get());
        return playingFieldRepository.save(playingField);
    }

    public List<PlayingFieldDTO> getAllPlayingFields(){
        List<PlayingField> playingFields =  playingFieldRepository.findAll();
        ModelMapper mapper = new ModelMapper();
        List<PlayingFieldDTO> playingFieldDTOS = new ArrayList<PlayingFieldDTO>();
        for(PlayingField pf: playingFields){
            playingFieldDTOS.add(mapper.map(pf, PlayingFieldDTO.class));
        }
        return playingFieldDTOS;

    }

    public void deletePlayingField(Long id){
        playingFieldRepository.deleteById(id);
    }

    public PlayingFieldDTO findById(Long id){
        Optional<PlayingField> playingFieldOptional = playingFieldRepository.findById(id);
        ModelMapper mapper = new ModelMapper();
        PlayingFieldDTO playingFieldDTO = null;
        if(playingFieldOptional.isPresent()){
            playingFieldDTO = mapper.map(playingFieldOptional.get(), PlayingFieldDTO.class);
        }
        return playingFieldDTO;
    }

    public List<PlayingFieldDTO> getPlayingFieldByClub(Long idClub){
        List<PlayingField> playingFields =  playingFieldRepository.getPlayingFieldsByClub(idClub);
        ModelMapper mapper = new ModelMapper();
        List<PlayingFieldDTO> playingFieldDTOS = new ArrayList<PlayingFieldDTO>();
        for(PlayingField pf: playingFields){
            playingFieldDTOS.add(mapper.map(pf, PlayingFieldDTO.class));
        }
        return playingFieldDTOS;
    }
}
