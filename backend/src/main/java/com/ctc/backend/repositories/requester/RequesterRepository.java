package com.ctc.backend.repositories.requester;

import com.ctc.backend.entities.users.Requester;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RequesterRepository extends MongoRepository<Requester, String> {
    Optional<Requester> findByUsername(String username);
    Optional<Requester> findByPhone(String phone);
    Optional<Requester> findByEmail(String email);

}
