package com.ctc.backend;

import com.ctc.backend.entities.sample.SampleMeasurementProcedure;
import com.ctc.backend.entities.sample.SampleTypes;
import com.ctc.backend.entities.test.Result;
import com.ctc.backend.entities.test.Test;
import com.ctc.backend.entities.users.Admin;
import com.ctc.backend.repositories.AdminRepository;
import com.ctc.backend.repositories.sample.SampleMeasurementProceduresRepository;
import com.ctc.backend.repositories.sample.SampleTypesRepository;
import com.ctc.backend.repositories.test.TestRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}
