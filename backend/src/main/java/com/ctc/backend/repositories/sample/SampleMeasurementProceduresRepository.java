package com.ctc.backend.repositories.sample;

import com.ctc.backend.entities.sample.SampleMeasurementProcedure;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SampleMeasurementProceduresRepository extends MongoRepository<SampleMeasurementProcedure, String> {
    Optional<SampleMeasurementProcedure> findByName(String name);
}
