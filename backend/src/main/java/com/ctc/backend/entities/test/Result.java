package com.ctc.backend.entities.test;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    Integer number;
    Double result;
    String parameter;
    String unit;
    String abnormalFlag;
}
