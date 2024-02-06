package com.ctc.backend.repositories.sample;

import com.ctc.backend.entities.sample.Sample;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SampleRepository extends MongoRepository<Sample, String> {
    Optional<Sample> findBySerialNumber(String serialNumber);
    Optional<Sample> findByTest(String test);
    Optional<List<Sample>> findAllByPatient(String patient);
    Optional<List<Sample>> findAllByRequester(String requester);
    Optional<List<Sample>> findAllByTester(String tester);
}
