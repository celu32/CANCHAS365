package com.dh.canchas365.repository.images;

import com.dh.canchas365.model.images.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagesRepository extends JpaRepository<Images, Long> {

    @Query(value = "select * from images i where i.id_club= :idClub", nativeQuery = true)
    List<Images> getImagesByClub(@Param("idClub") Long idClub);
}
