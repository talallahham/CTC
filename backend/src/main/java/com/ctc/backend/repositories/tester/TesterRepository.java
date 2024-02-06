package com.ctc.backend.repositories.tester;

import com.ctc.backend.entities.users.Tester;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TesterRepository extends MongoRepository<Tester, String> {
    Optional<Tester> findByUsername(String username);
    Optional<Tester> findByPhone(String phone);
    Optional<Tester> findByEmail(String email);
}
