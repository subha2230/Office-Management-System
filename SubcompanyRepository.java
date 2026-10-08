package com.officemanagement.officemanagement.repository;

import com.officemanagement.officemanagement.entity.Subcompany;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubcompanyRepository
        extends JpaRepository<Subcompany, Long> {

    Optional<Subcompany> findBySubcompanyCode(
            String subcompanyCode
    );

    boolean existsBySubcompanyCode(
            String subcompanyCode
    );
}