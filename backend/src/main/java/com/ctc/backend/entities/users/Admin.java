package com.ctc.backend.entities.users;

import com.ctc.backend.entities.global.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
@NoArgsConstructor
@AllArgsConstructor
public class Admin extends Person {
    @Id
    String username;
    String password;
}


