package com.officemanagement.officemanagement.controller;

import com.officemanagement.officemanagement.entity.Building;
import com.officemanagement.officemanagement.service.BuildingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
@CrossOrigin(origins = "http://localhost:5173")
public class BuildingController {

    private final BuildingService buildingService;

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @PostMapping
    public ResponseEntity<Building> create(
            @Valid @RequestBody Building building,
            @RequestParam Long locationId) {

        return ResponseEntity.ok(
                buildingService.create(building, locationId)
        );
    }

    @GetMapping
    public ResponseEntity<List<Building>> getAll() {
        return ResponseEntity.ok(buildingService.getAll());
    }

    @GetMapping("/location/{locationId}")
    public ResponseEntity<List<Building>> getByLocation(
            @PathVariable Long locationId) {

        return ResponseEntity.ok(
                buildingService.getByLocation(locationId)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Building> getById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                buildingService.getById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Building> update(
            @PathVariable String id,
            @Valid @RequestBody Building building,
            @RequestParam Long locationId) {

        return ResponseEntity.ok(
                buildingService.update(id, building, locationId)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(
            @PathVariable String id) {

        buildingService.delete(id);

        return ResponseEntity.ok("Building deleted successfully");
    }
}