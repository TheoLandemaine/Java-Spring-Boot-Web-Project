package com.codingfactory.porare;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PorareController {

    @RequestMapping("/")
    public String index(@RequestParam(value="name", defaultValue="World") String name, @RequestParam(value="age", defaultValue="0") int age) {
        return "Hello " + name + "! You are " + age + " years old.";
    }

    @RequestMapping("/goodbye")
    public String goodbye() {
        return "goodbye from Spring Boot!";
    }
}
