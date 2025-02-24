package com.bistromenu.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/secure-data")
    public ResponseEntity<String> secureEndpoint() {
        return ResponseEntity.ok("You have accessed a secure API!");
    }

}
