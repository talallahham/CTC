package com.ctc.backend.entities.global;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    String role;
    String name;
    String phone;
    String email;
    Character gender;
    LocalDate dob;
    Boolean isActive;
    LocalDateTime startDate;
    LocalDateTime endDate;
}
