package com.ctc.backend.responses.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManipulateUserResponse {
    Boolean success;
    Boolean usernameFound;
    Boolean isActive;
    Boolean phoneFound;
    Boolean emailFound;
}
