package com.ctc.backend.service;

import com.ctc.backend.entities.rest.RestAPIAuth;
import com.ctc.backend.entities.sample.Sample;
import com.ctc.backend.entities.sample.SampleMeasurementProcedure;
import com.ctc.backend.entities.sample.SampleTypes;
import com.ctc.backend.entities.test.Test;
import com.ctc.backend.entities.users.Admin;
import com.ctc.backend.entities.users.Patient;
import com.ctc.backend.entities.users.Requester;
import com.ctc.backend.entities.users.Tester;
import com.ctc.backend.repositories.AdminRepository;
import com.ctc.backend.repositories.patient.PatientRepository;
import com.ctc.backend.repositories.requester.RequesterRepository;
import com.ctc.backend.repositories.sample.SampleMeasurementProceduresRepository;
import com.ctc.backend.repositories.sample.SampleRepository;
import com.ctc.backend.repositories.sample.SampleTypesRepository;
import com.ctc.backend.repositories.test.TestRepository;
import com.ctc.backend.repositories.tester.TesterRepository;
import com.ctc.backend.responses.auth.Token;
import com.ctc.backend.responses.sample.SampleInfo;
import com.ctc.backend.responses.sample.SampleResponse;
import com.ctc.backend.responses.auth.AuthResponse;
import com.ctc.backend.responses.user.ManipulateUserResponse;
import com.ctc.backend.responses.user.UserInfo;
import com.ctc.backend.responses.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CTCService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private RequesterRepository requesterRepository;

    @Autowired
    private TesterRepository testerRepository;

    @Autowired
    private SampleRepository sampleRepository;

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private SampleTypesRepository sampleTypesRepository;

    @Autowired
    private SampleMeasurementProceduresRepository sampleMeasurementProceduresRepository;

    @Autowired
    private AdminRepository adminRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<ManipulateUserResponse> addUser(Map<String, String> payload) {
        String role = payload.get("role");
        String username = payload.get("username");
        String name = payload.get("name");
        String email = payload.get("email");
        String phone = payload.get("phone");
        Character gender = payload.get("gender").charAt(0);
        LocalDate dob = LocalDate.parse(payload.get("dob"));

        if (!role.equals("P") && !role.equals("R") && !role.equals("T")) {
            throw new Error("INVALID_USER_ROLE");
        }

        boolean foundInTester = testerRepository.findByUsername(username).isPresent();
        boolean foundInRequester = requesterRepository.findByUsername(username).isPresent();
        boolean foundInPatient = patientRepository.findByUsername(username).isPresent();


        if (foundInTester || foundInRequester || foundInPatient) {
            if (foundInTester) {
                Tester tester = testerRepository.findByUsername(username).get();
                return ResponseEntity.ok(new ManipulateUserResponse(false, true, tester.getIsActive(), false, false));
            } else if (foundInRequester) {
                Requester requester = requesterRepository.findByUsername(username).get();
                return ResponseEntity.ok(new ManipulateUserResponse(false, true, requester.getIsActive(), false, false));
            } else {
                Patient patient = patientRepository.findByUsername(username).get();
                return ResponseEntity.ok(new ManipulateUserResponse(false, true, patient.getIsActive(), false, false));
            }
        }

        if (role.equals("P")) {
            boolean foundInPhone = patientRepository.findByPhone(phone).isPresent();
            boolean foundInEmail = patientRepository.findByEmail(email).isPresent();
            if (foundInPhone) {
                return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, true, false));
            }

            if (foundInEmail) {
                return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, false, true));
            }

            Patient patient = new Patient();

            patient.setRole(role);
            patient.setUsername(username);
            patient.setName(name);
            patient.setEmail(email);
            patient.setPhone(phone);
            patient.setGender(gender);
            patient.setDob(dob);

            patient.setIsActive(true);
            patient.setStartDate(LocalDateTime.now());

            patientRepository.save(patient);

            return ResponseEntity.ok(new ManipulateUserResponse(true, false, false, false, false));
        } else if (role.equals("T")) {
            boolean foundInPhone = testerRepository.findByPhone(phone).isPresent();
            boolean foundInEmail = testerRepository.findByEmail(email).isPresent();
            if (foundInPhone) {
                return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, true, false));
            }

            if (foundInEmail) {
                return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, false, true));
            }

            Tester tester = new Tester();

            tester.setRole(role);
            tester.setUsername(username);
            tester.setPassword(bCryptPasswordEncoder.encode(payload.get("password")));
            tester.setName(name);
            tester.setEmail(email);
            tester.setPhone(phone);
            tester.setGender(gender);
            tester.setDob(dob);

            tester.setIsActive(true);
            tester.setStartDate(LocalDateTime.now());

            testerRepository.save(tester);

            return ResponseEntity.ok(new ManipulateUserResponse(true, false, false, false, false));
        } else {
            boolean foundInPhone = requesterRepository.findByPhone(phone).isPresent();
            boolean foundInEmail = requesterRepository.findByEmail(email).isPresent();
            if (foundInPhone) {
                return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, true, false));
            }

            if (foundInEmail && !email.isEmpty()) {
                return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, false, true));
            }

            Requester requester = new Requester();

            requester.setRole(role);
            requester.setUsername(username);
            requester.setName(name);
            requester.setEmail(email);
            requester.setPhone(phone);
            requester.setGender(gender);
            requester.setDob(dob);

            requester.setIsActive(true);
            requester.setStartDate(LocalDateTime.now());

            requesterRepository.save(requester);

            return ResponseEntity.ok(new ManipulateUserResponse(true, false, false, false, false));
        }
    }

    public ResponseEntity<Boolean> reactivateUser(String param) {
        String username = param.split("\"")[1];
        System.out.println(username);
        if (username.charAt(0) == 'P') {
            Patient patient = patientRepository.findByUsername(username).get();
            patient.setIsActive(true);
            patient.setEndDate(null);

            patientRepository.save(patient);
            return ResponseEntity.ok(true);

        } else if (username.charAt(0) == 'R') {
            Requester requester = requesterRepository.findByUsername(username).get();
            requester.setIsActive(true);
            requester.setEndDate(null);

            requesterRepository.save(requester);
            return ResponseEntity.ok(true);

        } else {
            Tester tester = testerRepository.findByUsername(username).get();
            tester.setIsActive(true);
            tester.setEndDate(null);

            testerRepository.save(tester);
            return ResponseEntity.ok(true);
        }
    }

    public ResponseEntity<UserResponse> getUser(String username) {
        Character role = username.charAt(0);

        if (role != 'P' && role != 'R' && role != 'T') {
            return ResponseEntity.ok(new UserResponse(false, false, null));
        }

        boolean foundInPatient = patientRepository.findByUsername(username).isPresent();
        boolean foundInTester = testerRepository.findByUsername(username).isPresent();
        boolean foundInRequester = requesterRepository.findByUsername(username).isPresent();

        UserInfo user = new UserInfo();

        if (role == 'P') {
            if (!foundInPatient) {
                return ResponseEntity.ok(new UserResponse(false, false, null));
            }

            Patient patient = patientRepository.findByUsername(username).get();

            user.setRole(patient.getRole());
            user.setUsername(patient.getUsername());
            user.setName(patient.getName());
            user.setPhone(patient.getPhone());
            user.setEmail(patient.getEmail());
            user.setGender(patient.getGender());
            user.setDob(patient.getDob());
            user.setIsActive(patient.getIsActive());
            user.setStartDate(patient.getStartDate());

            if (!user.getIsActive())
                user.setEndDate(patient.getEndDate());

            return ResponseEntity.ok(new UserResponse(true, patient.getIsActive(), user));

        } else if (role == 'T') {
            if (!foundInTester) {
                return ResponseEntity.ok(new UserResponse(false, false, null));
            }

            Tester tester = testerRepository.findByUsername(username).get();

            user.setRole(tester.getRole());
            user.setUsername(tester.getUsername());
            user.setName(tester.getName());
            user.setPhone(tester.getPhone());
            user.setEmail(tester.getEmail());
            user.setGender(tester.getGender());
            user.setDob(tester.getDob());
            user.setIsActive(tester.getIsActive());
            user.setStartDate(tester.getStartDate());

            if (!user.getIsActive())
                user.setEndDate(tester.getEndDate());

            return ResponseEntity.ok(new UserResponse(true, tester.getIsActive(), user));
        } else {
            if (!foundInRequester) {
                return ResponseEntity.ok(new UserResponse(false, false, null));
            }

            Requester requester = requesterRepository.findByUsername(username).get();

            user.setRole(requester.getRole());
            user.setUsername(requester.getUsername());
            user.setName(requester.getName());
            user.setPhone(requester.getPhone());
            user.setEmail(requester.getEmail());
            user.setGender(requester.getGender());
            user.setDob(requester.getDob());
            user.setIsActive(requester.getIsActive());
            user.setStartDate(requester.getStartDate());

            if (!user.getIsActive())
                user.setEndDate(requester.getEndDate());

            return ResponseEntity.ok(new UserResponse(true, requester.getIsActive(), user));
        }
    }

    public ResponseEntity<ManipulateUserResponse> editUser(Map<String, String> payload) {
        String role = payload.get("role");
        String username = payload.get("username");
        String name = payload.get("name");
        String email = payload.get("email");
        String phone = payload.get("phone");
        Character gender = payload.get("gender").charAt(0);
        LocalDate dob = LocalDate.parse(payload.get("dob"));

        if (!role.equals("P") && !role.equals("R") && !role.equals("T")) {
            throw new Error("INVALID_USER_ROLE");
        }

        Patient patient = new Patient();
        Requester requester = new Requester();
        Tester tester = new Tester();

        if (role.equals("P")) {
            patient = patientRepository.findByUsername(username).get();

            boolean foundInPhone = patientRepository.findByPhone(phone).isPresent();
            boolean foundInEmail = patientRepository.findByEmail(email).isPresent();
            if (foundInPhone) {
                if (!patient.getPhone().equals(patientRepository.findByPhone(phone).get().getPhone()))
                    return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, true, false));
            }

            if (foundInEmail) {
                if (!patient.getEmail().equals(patientRepository.findByEmail(email).get().getEmail()) && !email.isEmpty())
                    return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, false, true));
            }

            patient.setRole(role);
            patient.setUsername(username);
            patient.setName(name);
            patient.setEmail(email);
            patient.setPhone(phone);
            patient.setGender(gender);
            patient.setDob(dob);

            patientRepository.save(patient);

            return ResponseEntity.ok(new ManipulateUserResponse(true, false, false, false, false));
        } else if (role.equals("T")) {
            tester = testerRepository.findByUsername(username).get();

            boolean foundInPhone = testerRepository.findByPhone(phone).isPresent();
            boolean foundInEmail = testerRepository.findByEmail(email).isPresent();
            if (foundInPhone) {
                if (!tester.getPhone().equals(testerRepository.findByPhone(phone).get().getPhone()))
                    return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, true, false));
            }

            if (foundInEmail) {
                if (!tester.getEmail().equals(testerRepository.findByEmail(email).get().getEmail()))
                    return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, false, true));
            }

            tester.setRole(role);
            tester.setUsername(username);
            tester.setPassword(payload.get("password"));
            tester.setName(name);
            tester.setEmail(email);
            tester.setPhone(phone);
            tester.setGender(gender);
            tester.setDob(dob);

            testerRepository.save(tester);

            return ResponseEntity.ok(new ManipulateUserResponse(true, false, false, false, false));
        } else {
            requester = requesterRepository.findByUsername(username).get();

            boolean foundInPhone = requesterRepository.findByPhone(phone).isPresent();
            boolean foundInEmail = requesterRepository.findByEmail(email).isPresent();
            if (foundInPhone) {
                if (!requester.getPhone().equals(requesterRepository.findByPhone(phone).get().getPhone()))
                    return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, true, false));
            }

            if (foundInEmail) {
                if (!requester.getEmail().equals(requesterRepository.findByEmail(email).get().getEmail()))
                    return ResponseEntity.ok(new ManipulateUserResponse(false, false, false, false, true));
            }


            requester.setRole(role);
            requester.setUsername(username);
            requester.setName(name);
            requester.setEmail(email);
            requester.setPhone(phone);
            requester.setGender(gender);
            requester.setDob(dob);

            requesterRepository.save(requester);

            return ResponseEntity.ok(new ManipulateUserResponse(true, false, false, false, false));
        }
    }

    public ResponseEntity<Boolean> deactivateUser(String username) {
        Character role = username.charAt(0);

        if (role != 'T' && role != 'R') {
            throw new Error("INVALID_DEACTIVATE_USER_ROLE");
        }

        if (role == 'T') {
            Tester tester = testerRepository.findByUsername(username).get();
            tester.setIsActive(false);
            tester.setEndDate(LocalDateTime.now());
            testerRepository.save(tester);
            return ResponseEntity.ok(true);
        } else {
            Requester requester = requesterRepository.findByUsername(username).get();
            requester.setIsActive(false);
            requester.setEndDate(LocalDateTime.now());
            requesterRepository.save(requester);
            return ResponseEntity.ok(true);
        }
    }

    public ResponseEntity<Boolean> validateTest(String testId) {
        return ResponseEntity.ok(testRepository.findById(testId).isPresent());
    }

    public ResponseEntity<List<UserInfo>> getActiveUsers(String role) {
        if (!role.equals("P") && !role.equals("R") && !role.equals("T")) {
            throw new Error();
        }

        List<UserInfo> users = new ArrayList<>();
        if (role.equals("P")) {
            List<Patient> patients = patientRepository.findAll();

            for (Patient patient : patients) {
                if (patient.getIsActive()) {
                    users.add(new UserInfo(
                            patient.getRole(),
                            patient.getUsername(),
                            patient.getName(),
                            patient.getPhone(),
                            patient.getEmail(),
                            patient.getGender(),
                            patient.getDob(),
                            patient.getIsActive(),
                            patient.getStartDate(),
                            patient.getEndDate()
                    ));
                }
            }

            return ResponseEntity.ok(users);
        } else if (role.equals("T")) {
            List<Tester> testers = testerRepository.findAll();

            for (Tester tester : testers) {
                if (tester.getIsActive()) {
                    users.add(new UserInfo(
                            tester.getRole(),
                            tester.getUsername(),
                            tester.getName(),
                            tester.getPhone(),
                            tester.getEmail(),
                            tester.getGender(),
                            tester.getDob(),
                            tester.getIsActive(),
                            tester.getStartDate(),
                            tester.getEndDate()
                    ));
                }
            }

            return ResponseEntity.ok(users);
        } else {
            List<Requester> requesters = requesterRepository.findAll();

            for (Requester requester : requesters) {
                if (requester.getIsActive()) {
                    users.add(new UserInfo(
                            requester.getRole(),
                            requester.getUsername(),
                            requester.getName(),
                            requester.getPhone(),
                            requester.getEmail(),
                            requester.getGender(),
                            requester.getDob(),
                            requester.getIsActive(),
                            requester.getStartDate(),
                            requester.getEndDate()
                    ));
                }
            }

            return ResponseEntity.ok(users);
        }
    }

    public ResponseEntity<SampleResponse> saveSample(Map<String, String> payload) {
        String testId = payload.get("testId");
        String patientUsername = payload.get("patientUsername");
        String serialNumber = payload.get("serialNumber");
        String sampleType = payload.get("sampleType");
        Boolean isRevised = payload.get("isRevised").equals("Y");
        String measurement = payload.get("measurementProcedure");

        String requesterUsername = payload.get("requesterUsername");
        String testerUsername = payload.get("testerUsername");

        if (patientRepository.findByUsername(patientUsername).isEmpty()) {
            return ResponseEntity.ok(new SampleResponse(false, false, true, false, null));
        }

        if (sampleRepository.findBySerialNumber(serialNumber).isPresent()) {
            return ResponseEntity.ok(new SampleResponse(false, true, false, false, null));
        }

        Test test = testRepository.findById(testId).get();
        if (!test.getPatient().equals(patientUsername) && !test.getPatient().isEmpty()) {
            return ResponseEntity.ok(new SampleResponse(false, false, false, true, null));
        }

        Sample sample = new Sample();

        sample.setSerialNumber(serialNumber);
        sample.setType(sampleType);
        sample.setMeasurement(measurement);

        sample.setIssuedAt(LocalDateTime.now());
        sample.setIsRevised(isRevised);

        sample.setTest(testId);

        sample.setPatient(patientUsername);
        sample.setRequester(requesterUsername);
        sample.setTester(testerUsername);

        test.getSamples().add(serialNumber);
        test.setPatient(patientUsername);

        testRepository.save(test);
        sampleRepository.save(sample);

        SampleInfo sampleInfo = new SampleInfo();
        sampleInfo.setSerialNumber(sample.getSerialNumber());
        sampleInfo.setType(sample.getType());
        sampleInfo.setIssuedAt(sample.getIssuedAt());
        sampleInfo.setIsRevised(sample.getIsRevised());
        sampleInfo.setTest(testRepository.findById(testId).get());
        sampleInfo.setPatient(patientRepository.findByUsername(patientUsername).get());
        sampleInfo.setTester(testerRepository.findByUsername(testerUsername).get());
        sampleInfo.setRequester(requesterRepository.findByUsername(requesterUsername).get());

        return ResponseEntity.ok(new SampleResponse(true, false, false, false, sampleInfo));
    }

    public ResponseEntity<List<UserInfo>> getUsers(String role) {
        if (!role.equals("P") && !role.equals("R") && !role.equals("T")) {
            throw new Error();
        }

        List<UserInfo> users = new ArrayList<>();
        if (role.equals("P")) {
            List<Patient> patients = patientRepository.findAll();

            for (Patient patient : patients) {
                users.add(new UserInfo(
                        patient.getRole(),
                        patient.getUsername(),
                        patient.getName(),
                        patient.getPhone(),
                        patient.getEmail(),
                        patient.getGender(),
                        patient.getDob(),
                        patient.getIsActive(),
                        patient.getStartDate(),
                        patient.getEndDate()
                ));
            }

            return ResponseEntity.ok(users);
        } else if (role.equals("T")) {
            List<Tester> testers = testerRepository.findAll();

            for (Tester tester : testers) {
                users.add(new UserInfo(
                        tester.getRole(),
                        tester.getUsername(),
                        tester.getName(),
                        tester.getPhone(),
                        tester.getEmail(),
                        tester.getGender(),
                        tester.getDob(),
                        tester.getIsActive(),
                        tester.getStartDate(),
                        tester.getEndDate()
                ));
            }

            return ResponseEntity.ok(users);
        } else {
            List<Requester> requesters = requesterRepository.findAll();

            for (Requester requester : requesters) {
                users.add(new UserInfo(
                        requester.getRole(),
                        requester.getUsername(),
                        requester.getName(),
                        requester.getPhone(),
                        requester.getEmail(),
                        requester.getGender(),
                        requester.getDob(),
                        requester.getIsActive(),
                        requester.getStartDate(),
                        requester.getEndDate()
                ));
            }

            return ResponseEntity.ok(users);
        }
    }

    public ResponseEntity<List<Sample>> getSamples() {
        return ResponseEntity.ok(sampleRepository.findAll().isEmpty() ? new ArrayList<>() : sampleRepository.findAll());
    }

    public ResponseEntity<List<Sample>> getUserSamples(String username) {
        List<Sample> samples = new ArrayList<>();
        if (patientRepository.findByUsername(username).isPresent()) {
            samples = sampleRepository.findAllByPatient(username).get();
            return ResponseEntity.ok(samples);
        } else if (testerRepository.findByUsername(username).isPresent()) {
            samples = sampleRepository.findAllByTester(username).get();
            return ResponseEntity.ok(samples);

        } else if (requesterRepository.findByUsername(username).isPresent()) {
            samples = sampleRepository.findAllByRequester(username).get();
            return ResponseEntity.ok(samples);
        }

        throw new Error("NOT FOUND");
    }

    public ResponseEntity<SampleResponse> getSample(String serialNumber) {
        System.out.println(serialNumber);
        if (sampleRepository.findBySerialNumber(serialNumber).isEmpty()) {
            return ResponseEntity.ok(new SampleResponse(false, false, false, false, null));
        }

        Sample sample = sampleRepository.findBySerialNumber(serialNumber).get();

        SampleInfo sampleInfo = new SampleInfo();
        sampleInfo.setSerialNumber(sample.getSerialNumber());
        sampleInfo.setType(sample.getType());
        sampleInfo.setIssuedAt(sample.getIssuedAt());
        sampleInfo.setIsRevised(sample.getIsRevised());
        sampleInfo.setTest(testRepository.findById(sample.getTest()).get());
        sampleInfo.setPatient(patientRepository.findByUsername(sample.getPatient()).get());
        sampleInfo.setRequester(requesterRepository.findByUsername(sample.getRequester()).get());
        sampleInfo.setTester(testerRepository.findByUsername(sample.getTester()).get());
        sampleInfo.setMeasurement(sample.getMeasurement());

        return ResponseEntity.ok(new SampleResponse(true, false, false, false, sampleInfo));
    }

    public ResponseEntity<UserResponse> getUserInfo(String username) {
        UserInfo userInfo = new UserInfo();

        if (patientRepository.findByUsername(username).isPresent()) {
            Patient patient = patientRepository.findByUsername(username).get();

            userInfo.setUsername(patient.getUsername());
            userInfo.setRole(patient.getRole());

            userInfo.setName(patient.getName());
            userInfo.setPhone(patient.getPhone());
            userInfo.setEmail(patient.getEmail());

            userInfo.setGender(patient.getGender());
            userInfo.setDob(patient.getDob());

            userInfo.setIsActive(patient.getIsActive());
            userInfo.setStartDate(patient.getStartDate());
            userInfo.setEndDate(patient.getEndDate());

            return ResponseEntity.ok(new UserResponse(true, patient.getIsActive(), userInfo));
        }


        if (testerRepository.findByUsername(username).isPresent()) {
            Tester tester = testerRepository.findByUsername(username).get();

            userInfo.setUsername(tester.getUsername());
            userInfo.setRole(tester.getRole());

            userInfo.setName(tester.getName());
            userInfo.setPhone(tester.getPhone());
            userInfo.setEmail(tester.getEmail());

            userInfo.setGender(tester.getGender());
            userInfo.setDob(tester.getDob());

            userInfo.setIsActive(tester.getIsActive());
            userInfo.setStartDate(tester.getStartDate());
            userInfo.setEndDate(tester.getEndDate());

            return ResponseEntity.ok(new UserResponse(true, tester.getIsActive(), userInfo));
        }


        if (requesterRepository.findByUsername(username).isPresent()) {
            Requester requester = requesterRepository.findByUsername(username).get();

            userInfo.setUsername(requester.getUsername());
            userInfo.setRole(requester.getRole());

            userInfo.setName(requester.getName());
            userInfo.setPhone(requester.getPhone());
            userInfo.setEmail(requester.getEmail());

            userInfo.setGender(requester.getGender());
            userInfo.setDob(requester.getDob());

            userInfo.setIsActive(requester.getIsActive());
            userInfo.setStartDate(requester.getStartDate());
            userInfo.setEndDate(requester.getEndDate());

            return ResponseEntity.ok(new UserResponse(true, requester.getIsActive(), userInfo));
        }

        return ResponseEntity.ok(new UserResponse(false, false, null));
    }

    public ResponseEntity<AuthResponse> auth(Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        if(adminRepository.findByUsername(username).isEmpty() && testerRepository.findByUsername(username).isEmpty()) {
            return ResponseEntity.ok(new AuthResponse(false, false, null));
        }

        boolean isAdmin = adminRepository.findByUsername(username).isPresent();
        UserInfo userInfo = new UserInfo();

        if(isAdmin) {
            Admin admin = adminRepository.findByUsername(username).get();

            if(!bCryptPasswordEncoder.matches(password, admin.getPassword())) {
                return ResponseEntity.ok(new AuthResponse(false, false, null));
            }


            userInfo.setRole("ADMIN");
            userInfo.setUsername(admin.getUsername());
            userInfo.setName(admin.getName());
            userInfo.setPhone(admin.getPhone());
            userInfo.setEmail(admin.getEmail());

            userInfo.setDob(admin.getDob());
            userInfo.setGender(admin.getGender());

            userInfo.setIsActive(admin.getIsActive());
            userInfo.setStartDate(admin.getStartDate());
            userInfo.setEndDate(admin.getEndDate());

            return ResponseEntity.ok(new AuthResponse(true, true, userInfo));
        } else {
            Tester tester = testerRepository.findByUsername(username).get();
            if (!tester.getIsActive()) {
                return ResponseEntity.ok(new AuthResponse(false, false, null));
            }


            if (!bCryptPasswordEncoder.matches(password, tester.getPassword())) {
                return ResponseEntity.ok(new AuthResponse(false, false, null));
            }


            userInfo.setRole(tester.getRole());
            userInfo.setUsername(tester.getUsername());

            userInfo.setName(tester.getName());
            userInfo.setPhone(tester.getPhone());
            userInfo.setEmail(tester.getEmail());

            userInfo.setDob(tester.getDob());
            userInfo.setGender(tester.getGender());

            userInfo.setIsActive(tester.getIsActive());
            userInfo.setStartDate(tester.getStartDate());
            userInfo.setEndDate(tester.getEndDate());

            return ResponseEntity.ok(new AuthResponse(true, false, userInfo));
        }
    }

    public ResponseEntity<Boolean> addSampleType(String sampleType) {
        if (sampleTypesRepository.findByName(sampleType).isPresent())
            return ResponseEntity.ok(false);

        sampleTypesRepository.save(new SampleTypes(sampleType.substring(1, sampleType.length() - 1)));
        return ResponseEntity.ok(true);
    }

    public ResponseEntity<Boolean> addMeasurementProcedure(String measurementProcedure) {
        if (sampleMeasurementProceduresRepository.findByName(measurementProcedure).isPresent())
            return ResponseEntity.ok(false);

        sampleMeasurementProceduresRepository.save(new SampleMeasurementProcedure(measurementProcedure.substring(1, measurementProcedure.length() - 1)));
        return ResponseEntity.ok(true);
    }

    public ResponseEntity<Boolean> editSampleType(Map<String, String> payload) {
        String oldSampleType = payload.get("oldValue");
        String newSampleType = payload.get("newValue");

        if(sampleTypesRepository.findByName(oldSampleType).isEmpty())
            return ResponseEntity.ok(false);

        if(sampleTypesRepository.findByName(newSampleType).isPresent())
            return ResponseEntity.ok(false);

        sampleTypesRepository.delete(new SampleTypes(oldSampleType));
        sampleTypesRepository.save(new SampleTypes(newSampleType));
        return ResponseEntity.ok(true);
    }

    public ResponseEntity<Boolean> editMeasurementProcedure(Map<String, String> payload) {
        String oldMeasurementProcedure = payload.get("oldValue");
        String newMeasurementProcedure = payload.get("newValue");

        if(sampleMeasurementProceduresRepository.findByName(oldMeasurementProcedure).isEmpty())
            return ResponseEntity.ok(false);

        if(sampleMeasurementProceduresRepository.findByName(newMeasurementProcedure).isPresent())
            return ResponseEntity.ok(false);

        sampleMeasurementProceduresRepository.delete(new SampleMeasurementProcedure(oldMeasurementProcedure));
        sampleMeasurementProceduresRepository.save(new SampleMeasurementProcedure(newMeasurementProcedure));
        return ResponseEntity.ok(true);
    }

    public ResponseEntity<Boolean> deleteSampleType(String sampleType) {
        if(sampleTypesRepository.findByName(sampleType).isEmpty())
            return ResponseEntity.ok(false);

        SampleTypes sampleTypes = new SampleTypes(sampleType);
        sampleTypesRepository.delete(sampleTypes);
        return ResponseEntity.ok(true);
    }

    public ResponseEntity<Boolean> deleteMeasurementProcedure(String measurementProcedure) {
        if(sampleMeasurementProceduresRepository.findByName(measurementProcedure).isEmpty())
            return ResponseEntity.ok(false);

        SampleMeasurementProcedure sampleMeasurementProcedure = new SampleMeasurementProcedure(measurementProcedure);
        sampleMeasurementProceduresRepository.delete(sampleMeasurementProcedure);
        return ResponseEntity.ok(true);
    }

    public ResponseEntity<List<SampleTypes>> getSampleTypes() {
        return ResponseEntity.ok(sampleTypesRepository.findAll());
    }

    public ResponseEntity<List<SampleMeasurementProcedure>> getMeasurementProcedures() {
        return ResponseEntity.ok(sampleMeasurementProceduresRepository.findAll());
    }
}
