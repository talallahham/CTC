package com.ctc.backend.entities.sample;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Sample {
    @Id
    String serialNumber;
    String type;
    String measurement;

    LocalDateTime issuedAt;
    Boolean isRevised;

    String test;

    String patient;
    String requester;
    String tester;
}
