package com.dh.canchas365.controller.location;

import com.dh.canchas365.model.Club;
import com.dh.canchas365.model.location.State;
import com.dh.canchas365.service.location.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/state")
public class StateController {

    @Autowired
    private StateService stateService;

    @PostMapping
    public ResponseEntity<State> createState(@RequestBody State state){
        return new ResponseEntity<State>(stateService.createState(state), HttpStatus.CREATED);
    }
}
