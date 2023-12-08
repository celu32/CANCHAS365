package com.dh.canchas365.repository;

import com.dh.canchas365.model.PlayingField;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayingFieldRepository extends JpaRepository<PlayingField, Long> {

    @Query(value = "select * from playing_field p where p.id_club= :idClub", nativeQuery = true)
    List<PlayingField> getPlayingFieldsByClub(@Param("idClub") Long idClub);



}
