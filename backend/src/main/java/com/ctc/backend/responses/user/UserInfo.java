package com.ctc.backend.responses.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    String role;

    String username;

    String name;
    String phone;
    String email;

    Character gender;
    LocalDate dob;

    Boolean isActive;
    LocalDateTime startDate;
    LocalDateTime endDate;
}
