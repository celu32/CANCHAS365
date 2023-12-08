package com.dh.canchas365.repository;

import com.dh.canchas365.dto.ClubDTO;
import com.dh.canchas365.model.Category;
import com.dh.canchas365.model.Club;
import com.dh.canchas365.model.location.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

    @Query("select c from Club c where c.recommended= 1")
    List<Club> getClubRecommended();

    @Query("select c from Club c where c.name= ?1")
    Optional<Club> findByName(String name);

    @Query(value = "select * from club ORDER BY RAND() LIMIT 8", nativeQuery = true)
    List<Club> getRandomClubs();

    @Query(value = "select * from club where id_category = :id", nativeQuery = true)
    Optional<Club> clubCategoryInUse(@Param("id") Long category);

    @Query(value = "SELECT c.id, c.name, c.phone_number, c.recommended, c.id_address, c.id_category FROM club_characteristic cc " +
            "JOIN club c ON cc.id_club = c.id " +
            "WHERE cc.id_characteristic = :id_characteristic", nativeQuery = true)
    Optional<Club> clubCaracteristicInUse(@Param("id_characteristic") Long characteristic);

    @Query(value = "SELECT cl.id, cl.id_address, cl.id_category, cl.name, cl.phone_number, cl.recommended FROM club cl " +
            "JOIN address ad on ad.id = cl.id_address " +
            "JOIN city ci on ci.id = ad.id_city " +
            "WHERE cl.id_category = :id_category and ci.id = :id_city", nativeQuery = true)
    Optional<List<Club>> clubSearch(@Param("id_category") Long category, @Param("id_city") Long city);

    @Query(value = "SELECT cl FROM Club cl WHERE category = ?1 and address.city = ?2")
    Optional<List<Club>> clubSearchAll(Category category, City city);
}
