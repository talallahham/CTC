package com.ctc.backend.responses.auth;

import com.ctc.backend.responses.user.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    Boolean success;
    Boolean isAdmin;
    UserInfo user;
}
