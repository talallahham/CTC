package com.ctc.backend.responses.sample;

import com.ctc.backend.entities.test.Test;
import com.ctc.backend.entities.users.Patient;
import com.ctc.backend.entities.users.Requester;
import com.ctc.backend.entities.users.Tester;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SampleInfo {
    String serialNumber;

    String type;
    String measurement;

    LocalDateTime issuedAt;
    Boolean isRevised;

    Test test;

    Patient patient;
    Requester requester;
    Tester tester;
}
