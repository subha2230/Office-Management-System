package com.officemanagement.officemanagement.repository;

import com.officemanagement.officemanagement.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BuildingRepository
        extends JpaRepository<Building, String> {

    boolean existsByBuildingCode(String buildingCode);

    List<Building> findByLocationId(Long locationId);

    Optional<Building> findByBuildingCode(String buildingCode);
}