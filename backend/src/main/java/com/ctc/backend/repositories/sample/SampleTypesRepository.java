package com.ctc.backend.repositories.sample;

import com.ctc.backend.entities.sample.SampleTypes;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SampleTypesRepository extends MongoRepository<SampleTypes, String> {
    Optional<SampleTypes> findByName(String name);
}
