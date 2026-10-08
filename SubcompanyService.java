package com.officemanagement.officemanagement.service;

import com.officemanagement.officemanagement.entity.Company;
import com.officemanagement.officemanagement.entity.Subcompany;
import com.officemanagement.officemanagement.repository.CompanyRepository;
import com.officemanagement.officemanagement.repository.SubcompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubcompanyService {

    private final SubcompanyRepository subcompanyRepository;
    private final CompanyRepository companyRepository;

    public SubcompanyService(
            SubcompanyRepository subcompanyRepository,
            CompanyRepository companyRepository
    ) {
        this.subcompanyRepository = subcompanyRepository;
        this.companyRepository = companyRepository;
    }

    // ==========================================
    // CREATE SUBCOMPANY
    // ==========================================

    public Subcompany createSubcompany(
            Subcompany subcompany,
            String companyId
    ) {

        if (subcompanyRepository.existsBySubcompanyCode(
                subcompany.getSubcompanyCode()
        )) {

            throw new RuntimeException(
                    "Subcompany code already exists"
            );
        }

        Company company =
                companyRepository.findById(companyId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found with id: "
                                                + companyId
                                )
                        );

        subcompany.setCompany(company);

        return subcompanyRepository.save(subcompany);
    }

    // ==========================================
    // GET ALL SUBCOMPANIES
    // ==========================================

    public List<Subcompany> getAllSubcompanies() {

        return subcompanyRepository.findAll();
    }

    // ==========================================
    // GET SUBCOMPANY BY ID
    // ==========================================

    public Subcompany getSubcompanyById(Long id) {

        return subcompanyRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Subcompany not found with id: " + id
                        )
                );
    }

    // ==========================================
    // UPDATE SUBCOMPANY
    // ==========================================

    public Subcompany updateSubcompany(
            Long id,
            Subcompany updatedSubcompany,
            String companyId
    ) {

        Subcompany subcompany =
                subcompanyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Subcompany not found"
                                )
                        );

        Company company =
                companyRepository.findById(companyId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Company not found with id: "
                                                + companyId
                                )
                        );

        if (!subcompany.getSubcompanyCode()
                .equals(updatedSubcompany.getSubcompanyCode())
                && subcompanyRepository.existsBySubcompanyCode(
                updatedSubcompany.getSubcompanyCode()
        )) {

            throw new RuntimeException(
                    "Subcompany code already exists"
            );
        }

        subcompany.setSubcompanyName(
                updatedSubcompany.getSubcompanyName()
        );

        subcompany.setSubcompanyCode(
                updatedSubcompany.getSubcompanyCode()
        );

        subcompany.setDescription(
                updatedSubcompany.getDescription()
        );

        subcompany.setIsActive(
                updatedSubcompany.getIsActive()
        );

        subcompany.setCompany(company);

        return subcompanyRepository.save(subcompany);
    }

    // ==========================================
    // DELETE SUBCOMPANY
    // ==========================================

    public void deleteSubcompany(Long id) {

        Subcompany subcompany =
                subcompanyRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Subcompany not found"
                                )
                        );

        subcompanyRepository.delete(subcompany);
    }
}