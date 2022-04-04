package com.codingfactory.porare;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProrareController {

    @RequestMapping("/")
    public String index() {
        return "Greetings from Spring Boot!";
    }

    @RequestMapping("/goodbye")
    public String goodbye() {
        return "goodbye from Spring Boot!";
    }
}
