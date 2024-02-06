package com.ctc.backend.responses.sample;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SampleResponse {
    Boolean success;

    Boolean serialNumberExist;

    Boolean patientNotFound;
    Boolean testInUse;

    SampleInfo sampleInfo;
}
