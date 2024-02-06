package com.ctc.backend.responses.auth;

import com.ctc.backend.entities.rest.RestAPIAuth;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Token {
    RestAPIAuth credentials;
    LocalDateTime expiresAt;
}
