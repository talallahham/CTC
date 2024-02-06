package com.ctc.backend.controller;

import com.ctc.backend.entities.sample.Sample;
import com.ctc.backend.entities.sample.SampleMeasurementProcedure;
import com.ctc.backend.entities.sample.SampleTypes;
import com.ctc.backend.responses.sample.SampleResponse;
import com.ctc.backend.responses.auth.AuthResponse;
import com.ctc.backend.responses.user.ManipulateUserResponse;
import com.ctc.backend.responses.user.UserInfo;
import com.ctc.backend.responses.user.UserResponse;
import com.ctc.backend.service.CTCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ctc")
public class CTCController {

    @Autowired
    private CTCService ctcService;

    @PostMapping("/auth")
    ResponseEntity<AuthResponse> auth(@RequestBody Map<String, String> payload) {
        return ctcService.auth(payload);
    }

    @PostMapping("/users/user/add")
    ResponseEntity<ManipulateUserResponse> addUser(@RequestBody Map<String, String> payload) {
        return ctcService.addUser(payload);
    }

    @PutMapping("/users/user/reactivate")
    ResponseEntity<Boolean> reactivateUser(@RequestBody String username) {
        return ctcService.reactivateUser(username);
    }

    @GetMapping("/users/user/get")
    ResponseEntity<UserResponse> getUser(@RequestParam(required = false) String username) {
        return ctcService.getUser(username);
    }

    @PutMapping("/users/user/edit")
    ResponseEntity<ManipulateUserResponse> editUser(@RequestBody Map<String, String> payload) {
        return ctcService.editUser(payload);
    }

    @PutMapping("/users/user/deactivate")
    ResponseEntity<Boolean> deactivateUser(@RequestParam(required = false) String username) {
        return ctcService.deactivateUser(username);
    }

    @GetMapping("/tests/test/validate")
    ResponseEntity<Boolean> validateTest(@RequestParam(required = false) String testId) {
        return ctcService.validateTest(testId);
    }

    @GetMapping("/users/active/get")
    ResponseEntity<List<UserInfo>> getActiveUsers(@RequestParam(required = false) String role) {
        return ctcService.getActiveUsers(role);
    }

    @GetMapping("/users/get")
    ResponseEntity<List<UserInfo>> getUsers(@RequestParam(required = false) String role) {
        return ctcService.getUsers(role);
    }

    @GetMapping("/users/user/info/get")
    ResponseEntity<UserResponse> getUserInfo(@RequestParam(required = false) String username) {
        return ctcService.getUserInfo(username);
    }

    @PostMapping("/samples/sample/save")
    ResponseEntity<SampleResponse> saveSample(@RequestBody Map<String, String> payload) {
        return ctcService.saveSample(payload);
    }

    @GetMapping("/samples/get")
    ResponseEntity<List<Sample>> getSamples() {
        return ctcService.getSamples();
    }

    @GetMapping("/samples/user/get")
    ResponseEntity<List<Sample>> getUserSamples(@RequestParam(required = false) String username) {
        return ctcService.getUserSamples(username);
    }

    @GetMapping("/samples/sample/get")
    ResponseEntity<SampleResponse> getSample(@RequestParam(required = false) String serialNumber) {
        return ctcService.getSample(serialNumber);
    }

    @PostMapping("/samples/types/add")
    ResponseEntity<Boolean> addSampleType(@RequestBody String sampleType) {
        return ctcService.addSampleType(sampleType);
    }

    @PostMapping("/samples/measurement_procedure/add")
    ResponseEntity<Boolean> addMeasurementProcedure(@RequestBody String measurementProcedure) {
        return ctcService.addMeasurementProcedure(measurementProcedure);
    }

    @PutMapping("/samples/types/edit")
    ResponseEntity<Boolean> editSampleType(@RequestBody Map<String, String> payload) {
        return ctcService.editSampleType(payload);
    }

    @PutMapping("/samples/measurement_procedure/edit")
    ResponseEntity<Boolean> editMeasurementProcedure(@RequestBody Map<String, String> payload) {
        return ctcService.editMeasurementProcedure(payload);
    }

    @DeleteMapping("/samples/types/delete")
    ResponseEntity<Boolean> deleteSampleType(@RequestParam(required = false) String sampleType) {
        return ctcService.deleteSampleType(sampleType);
    }

    @DeleteMapping("/samples/measurement_procedure/delete")
    ResponseEntity<Boolean> deleteMeasurementProcedure(@RequestParam(required = false) String measurementProcedure) {
        return ctcService.deleteMeasurementProcedure(measurementProcedure);
    }

    @GetMapping("/samples/types/get")
    ResponseEntity<List<SampleTypes>> getSampleTypes() {
        return ctcService.getSampleTypes();
    }

    @GetMapping("/samples/measurement_procedures/get")
    ResponseEntity<List<SampleMeasurementProcedure>> getMeasurementProcedures() {
        return ctcService.getMeasurementProcedures();
    }
}
