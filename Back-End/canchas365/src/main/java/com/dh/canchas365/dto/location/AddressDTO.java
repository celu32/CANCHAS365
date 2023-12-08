package com.dh.canchas365.dto.location;

import com.dh.canchas365.model.location.City;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddressDTO {
    private Long id;
    private String street;

    private Integer number;

    private Integer floor;

    private String apartment;

    private City city;
}
