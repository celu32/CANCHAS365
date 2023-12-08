package com.dh.canchas365.service.location;

import com.dh.canchas365.model.location.State;
import com.dh.canchas365.repository.location.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    public State createState(State state){
        return stateRepository.save(state);
    }
}
