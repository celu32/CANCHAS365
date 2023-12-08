package com.dh.canchas365.repository.location;

import com.dh.canchas365.model.location.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address,Long> {
    @Query(value = "select * from address a where a.street= :street and a.number = :number and id_city= :idCity", nativeQuery = true)
    Optional<Address> findByAddress(String street, Integer number, Long idCity);
}
