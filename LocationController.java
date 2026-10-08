package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.entity.Location;
import com.officemanagement.officemanagement.service.LocationService;

import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(
        origins = "http://localhost:5173",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class LocationController {

    private final LocationService locationService;

    // =========================
    // CONSTRUCTOR
    // =========================

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    // =========================
    // CREATE LOCATION
    // ADMIN ONLY
    // =========================

    @PostMapping
    public ResponseEntity<Location> createLocation(
            @Valid @RequestBody Location location,
            Authentication authentication
    ) {

        Location savedLocation =
                locationService.createLocation(
                        location,
                        authentication.getName() //update by and create by
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedLocation);
    }

    // =========================
    // GET ALL LOCATIONS
    // ADMIN + USER
    // =========================

    @GetMapping
    public ResponseEntity<Page<Location>> getAllLocations(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        Page<Location> locations =
                locationService.getAllLocations(page, size);

        return ResponseEntity.ok(locations);
    }

    // =========================
    // GET LOCATION BY ID
    // ADMIN + USER
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(
            @PathVariable Long id
    ) {

        Location location =
                locationService.getLocationById(id);

        return ResponseEntity.ok(location);
    }

    // =========================
    // UPDATE LOCATION
    // ADMIN ONLY
    // =========================

    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(
            @PathVariable Long id,
            @Valid @RequestBody Location location,
            Authentication authentication
    ) {

        Location updatedLocation =
                locationService.updateLocation(
                        id,
                        location,
                        authentication.getName()
                );

        return ResponseEntity.ok(updatedLocation);
    }

    // =========================
    // DELETE LOCATION
    // ADMIN ONLY
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(
            @PathVariable Long id
    ) {

        locationService.deleteLocation(id);

        return ResponseEntity
                .noContent()
                .build();
    }
}