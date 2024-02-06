package com.ctc.backend.controller;

import com.ctc.backend.service.ASTMMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;


@Component
public class ASTMMessageListener {

    @Autowired
    private ASTMMessageService astmMessageService;

    @EventListener(ApplicationReadyEvent.class)
    public void startSocketServer() {
        int port = 2121;
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            while (true) {
                Socket clientSocket = serverSocket.accept();
                new Thread(() -> {
                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()))) {
                        String line;
                        StringBuilder message = new StringBuilder();
                        while ((line = reader.readLine()) != null) {
                            if (line.startsWith("L")) {
                                if (message.length() > 0) {
                                    message.append(line);
                                    handleCompleteMessage(message.toString());
                                    message.setLength(0);
                                }
                                message.append(line);
                            } else {
                                message.append(line);
                            }

                            message.append('\n');
                        }
                        // Handle the last message if not empty
                        if (message.length() > 0) {
                            handleCompleteMessage(message.toString());
                        }
                    } catch (IOException ex) {
                        ex.printStackTrace();
                    } finally {
                        try {
                            clientSocket.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }).start();
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    private void handleCompleteMessage(String completeMessage) {
        //Secure code
        astmMessageService.handleASTMMessages(completeMessage);
    }
}



