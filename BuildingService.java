package com.officemanagement.officemanagement.service;

import com.officemanagement.officemanagement.entity.Building;
import com.officemanagement.officemanagement.entity.Location;
import com.officemanagement.officemanagement.repository.BuildingRepository;
import com.officemanagement.officemanagement.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingService {

    private final BuildingRepository buildingRepository;
    private final LocationRepository locationRepository;

    public BuildingService(BuildingRepository buildingRepository,
                           LocationRepository locationRepository) {
        this.buildingRepository = buildingRepository;
        this.locationRepository = locationRepository;
    }

    public Building create(Building building, Long locationId) {

        if (buildingRepository.existsByBuildingCode(building.getBuildingCode())) {
            throw new RuntimeException("Building code already exists");
        }

        Location location = locationRepository.findById(locationId)
                .orElseThrow(() ->
                        new RuntimeException("Location not found with id: " + locationId));

        building.setId(generateBuildingId());

        building.setLocation(location);

        return buildingRepository.save(building);
    }

    public List<Building> getAll() {
        return buildingRepository.findAll();
    }

    public List<Building> getByLocation(Long locationId) {

        if (!locationRepository.existsById(locationId)) {
            throw new RuntimeException(
                    "Location not found with id: " + locationId
            );
        }

        return buildingRepository.findByLocationId(locationId);
    }

    public Building getById(String id) {

        return buildingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Building not found with id: " + id
                        ));
    }

    public Building update(String id, Building updated, Long locationId) {

        Building existing = getById(id);

        Location location = locationRepository.findById(locationId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Location not found with id: " + locationId
                        ));

        if (!existing.getBuildingCode().equals(updated.getBuildingCode())
                && buildingRepository.existsByBuildingCode(
                updated.getBuildingCode())) {

            throw new RuntimeException("Building code already exists");
        }

        existing.setBuildingCode(updated.getBuildingCode());
        existing.setBuildingName(updated.getBuildingName());
        existing.setAddress(updated.getAddress());
        existing.setIsActive(updated.getIsActive());
        existing.setLocation(location);

        return buildingRepository.save(existing);
    }

    public void delete(String id) {
        buildingRepository.delete(getById(id));
    }

    private String generateBuildingId() {

        long buildingNumber = buildingRepository.count() + 1;

        return String.format("BLD%03d", buildingNumber);
    }
}