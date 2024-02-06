package com.ctc.backend.service;

import com.ctc.backend.entities.test.Result;
import com.ctc.backend.entities.test.Test;
import com.ctc.backend.repositories.test.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ASTMMessageService {

    @Autowired
    TestRepository testRepository;

    public void handleHEMMessages(String message) {
        String[] content = message.split("\\n");

        // ---- TEST INFO ----
        String id = "";
        String orderNumber = "";
        String type = "HEM";

        List<Result> results = new ArrayList<>();
        // ----------------------

        for (String line: content) {
            if (line.startsWith("P")) {
                String[] patientInfo = line.split("\\|");

                String patientID = patientInfo[4];
                String patientName = patientInfo[5].split("\\^")[1] + " " + patientInfo[5].split("\\^")[2];

                String patientDOB = String.valueOf(patientInfo[7].charAt(0)) +
                        patientInfo[7].charAt(1) +
                        patientInfo[7].charAt(2) +
                        patientInfo[7].charAt(3) +
                        "\\" +
                        patientInfo[7].charAt(4) +
                        patientInfo[7].charAt(5) +
                        "\\" +
                        patientInfo[7].charAt(6) +
                        patientInfo[7].charAt(7);

                String patientGender = patientInfo[8];
            }

            if(line.startsWith("O")) {
                String[] sampleInfo = line.split("\\|");
                orderNumber = sampleInfo[3].split("\\^")[2];

                id = orderNumber.concat(type);
            }

            if(line.startsWith("R")) {
                String[] resultInfo = line.split("\\|");

                String parameter = resultInfo[2].split("\\^")[4];
                if(parameter.equals("PLT"))
                    parameter = "plateletCount";
                else if(parameter.equals("RDW-CV"))
                    parameter = "RDWCV";
                else if(parameter.equals("NEUT#"))
                    parameter = "Neutrophils";
                else if(parameter.equals("LYMPH#"))
                    parameter = "Lymphocytes";
                else if(parameter.equals("MONO#"))
                    parameter = "Monocytes";
                else if(parameter.equals("EO#"))
                    parameter = "Eosinophils";
                else if(parameter.equals("BASO#"))
                    parameter = "Basophils";
                else if(parameter.equals("IG#"))
                    parameter = "IG";

                Double value = Double.parseDouble(resultInfo[3]);
                String unit = resultInfo[4];
                String abnormalFlag = resultInfo[6];
                String dateAndTime = resultInfo[12]; //YYYY MM DD HH MM SS

                Result result = new Result();

                result.setResult(value);
                result.setUnit(unit);
                result.setAbnormalFlag(abnormalFlag);
                result.setParameter(parameter);
                result.setNumber(-1);

                results.add(result);
            }
        }

        Test test = new Test(
                id,
                orderNumber,
                type,
                results,
                LocalDateTime.now(),
                new ArrayList<>(),
                "");

        testRepository.save(test);
    }

    public void handleCHMMessages(String message) {
        String[] content = message.split("\\n");

        // ---- TEST INFO ----
        String id = "";
        String orderNumber = "";
        String type = "CHM";

        List<Result> results = new ArrayList<>();
        // ----------------------

        for (String line: content) {
            if (line.startsWith("P")) {
                String[] patientInfo = line.split("\\|");
                String patientDOB = String.valueOf(patientInfo[7].charAt(0)) +
                        patientInfo[7].charAt(1) +
                        patientInfo[7].charAt(2) +
                        patientInfo[7].charAt(3) +
                        "\\" +
                        patientInfo[7].charAt(4) +
                        patientInfo[7].charAt(5) +
                        "\\" +
                        patientInfo[7].charAt(6) +
                        patientInfo[7].charAt(7);

                String patientGender = patientInfo[8];
            }

            if(line.startsWith("O")) {
                String[] sampleInfo = line.split("\\|");
                System.out.println(Arrays.toString(sampleInfo));
                orderNumber = sampleInfo[3].split("\\^")[2];

                id = orderNumber.concat(type);
            }

            if(line.startsWith("R")) {
                String[] resultInfo = line.split("\\|");

//                Integer testNumber = Integer.parseInt(resultInfo[2].split("\\^")[4]);
                String parameter = resultInfo[2].split("\\^")[4];
                Double value = Double.parseDouble(resultInfo[3]);
                String unit = resultInfo[4];
                String abnormalFlag = resultInfo[6];
                String dateAndTime = resultInfo[11]; //YYYY MM DD HH MM SS

                Result result = new Result();

                result.setResult(value);
                result.setUnit(unit);
                result.setAbnormalFlag(abnormalFlag);
                result.setParameter(parameter);
                result.setNumber(-1);

                results.add(result);
            }
        }

        Test test = new Test(
                id,
                orderNumber,
                type,
                results,
                LocalDateTime.now(),
                new ArrayList<>(),
                "");

        testRepository.save(test);
    }

    public void handleASTMMessages(String message) {
        String[] content = message.split("\\|");

        if(message.startsWith("H")) {
            String[] senderInfo = content[4].split("\\^");
            if (senderInfo[0].equals("XN-35"))
                handleHEMMessages(message);
            else
                handleCHMMessages(message);
        }
    }
}
