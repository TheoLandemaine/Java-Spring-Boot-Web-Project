package com.codingfactory.porare.web;


import java.util.Arrays;
import java.util.List;

import com.codingfactory.porare.service.LoginService;
import org.springframework.web.bind.annotation.*;

import com.codingfactory.porare.data.User;
import com.codingfactory.porare.service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/")
public class PorareRestController {

    private final UserService userService;
    private final LoginService loginService;

    public PorareRestController(UserService personService, LoginService loginService) {
        this.userService = personService;
        this.loginService = loginService;
    }


    @GetMapping("users")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("register")
    public boolean register(@RequestParam String username,
                               @RequestParam String email,
                               @RequestParam String password,
                               @RequestParam String confirmPassword,
                               HttpServletRequest httpServletRequest) {

        return loginService.registerUser(username, email, password, confirmPassword);
    }

}
