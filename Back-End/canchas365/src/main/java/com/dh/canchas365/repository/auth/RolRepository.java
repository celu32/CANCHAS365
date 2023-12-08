package com.dh.canchas365.repository.auth;

import com.dh.canchas365.model.auth.Rol;
import com.dh.canchas365.model.emun.ERol;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface RolRepository extends CrudRepository<Rol, Long> {
    @Query("SELECT r FROM Rol r WHERE r.name = :name")
    Rol findByName(@Param("name") ERol name);
}
