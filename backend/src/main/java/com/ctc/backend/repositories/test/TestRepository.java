package com.ctc.backend.repositories.test;

import com.ctc.backend.entities.test.Test;
import lombok.NonNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TestRepository extends MongoRepository<Test, String> {
    Optional<Test> findById(@NonNull String id);
}
