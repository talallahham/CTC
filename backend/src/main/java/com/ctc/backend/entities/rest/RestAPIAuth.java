package com.ctc.backend.entities.rest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestAPIAuth {
    String username;
    String password;
}
