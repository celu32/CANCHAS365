package com.dh.canchas365.dto.location;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CityCreateDTO {

    private Long id;

    private String name;

    private Long idState;
}
