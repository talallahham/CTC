package com.ctc.backend.repositories.patient;

import com.ctc.backend.entities.users.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {
    Optional<Patient> findByUsername(String username);
    Optional<Patient> findByPhone(String phone);
    Optional<Patient> findByEmail(String email);
}
