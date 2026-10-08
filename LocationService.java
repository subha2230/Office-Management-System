package com.officemanagement.officemanagement.service;

import com.officemanagement.officemanagement.entity.Location;
import com.officemanagement.officemanagement.exception.ResourceNotFoundException;
import com.officemanagement.officemanagement.repository.LocationRepository;
import com.officemanagement.officemanagement.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final UserRepository userRepository;

    public LocationService(
            LocationRepository locationRepository,
            UserRepository userRepository
    ) {
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
    }

    // =========================
    // RESOLVE USERNAME
    // =========================
    private String resolveDisplayName(String email) {

        if (email == null) {
            return "system";
        }

        return userRepository.findByEmail(email)
                .map(user -> user.getUsername())
                .orElse(email);
    }

    // =========================
    // CREATE LOCATION
    // =========================
    public Location createLocation(
            Location location,
            String creatorEmail
    ) {

        if (locationRepository.existsByLocationCode(
                location.getLocationCode())) {

            throw new RuntimeException(
                    "Location code already exists"
            );
        }

        String displayName = resolveDisplayName(creatorEmail);

        // Server controls audit fields
        location.setCreatedBy(displayName);
        location.setUpdatedBy(displayName);

        return locationRepository.save(location);
    }

    // =========================
    // GET ALL LOCATIONS
    // =========================
    public Page<Location> getAllLocations(
            int page,
            int size
    ) {

        Pageable pageable = PageRequest.of(page, size);

        return locationRepository.findAll(pageable);
    }

    // =========================
    // GET LOCATION BY ID
    // =========================
    public Location getLocationById(Long id) {

        return locationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Location not found with id: " + id
                        )
                );
    }

    // =========================
    // UPDATE LOCATION
    // =========================
    public Location updateLocation(
            Long id,
            Location updatedLocation,
            String updaterEmail
    ) {

        Location existingLocation =
                getLocationById(id);

        // Check location code change
        if (!existingLocation.getLocationCode()
                .equals(updatedLocation.getLocationCode())) {

            if (locationRepository.existsByLocationCode(
                    updatedLocation.getLocationCode())) {

                throw new RuntimeException(
                        "Location code already exists"
                );
            }
        }

        existingLocation.setLocationCode(
                updatedLocation.getLocationCode()
        );

        existingLocation.setLocationName(
                updatedLocation.getLocationName()
        );

        existingLocation.setHeadOffice(
                updatedLocation.getHeadOffice()
        );

        existingLocation.setWhatsappRequired(
                updatedLocation.getWhatsappRequired()
        );

        existingLocation.setTeamsRequired(
                updatedLocation.getTeamsRequired()
        );

        existingLocation.setVolunteerFlowRequired(
                updatedLocation.getVolunteerFlowRequired()
        );

        existingLocation.setEsslReconcile(
                updatedLocation.getEsslReconcile()
        );

        existingLocation.setDeviceType(
                updatedLocation.getDeviceType()
        );

        existingLocation.setInOutLocationName(
                updatedLocation.getInOutLocationName()
        );

        // createdBy never changes
        existingLocation.setUpdatedBy(
                resolveDisplayName(updaterEmail)
        );

        return locationRepository.save(existingLocation);
    }

    // =========================
    // DELETE LOCATION
    // =========================
    public void deleteLocation(Long id) {

        Location location = getLocationById(id);

        locationRepository.delete(location);
    }
}