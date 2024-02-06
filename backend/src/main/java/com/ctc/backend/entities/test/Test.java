package com.ctc.backend.entities.test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Test {
    @Id
    String id;

    String orderNumber;
    String type;

    List<Result> results;

    LocalDateTime issuedAt;

    List<String> samples;
    String patient;
}
