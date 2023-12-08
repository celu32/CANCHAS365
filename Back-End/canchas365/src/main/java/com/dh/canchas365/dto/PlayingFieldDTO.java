package com.dh.canchas365.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PlayingFieldDTO {

    private Long id;

    private String description;

    private Long idClub;

    //private Long idSport;

    private CategoryDto category;
}
