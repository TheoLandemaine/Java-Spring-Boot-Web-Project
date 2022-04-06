package com.codingfactory.porare.web;


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
        /*
        * Return @List<User>
        * List of all users
        */
        return userService.getAllUsers();
    }

    @PostMapping("register")
    public String register(@RequestParam String username, // Get username from the request
                           @RequestParam String email, // Get email from the request
                           @RequestParam String password, // Get password from the request
                           @RequestParam String confirmPassword, // Get confirm password from the request
                           HttpServletRequest httpServletRequest) {

        /*
        * Return @Boolean
        * true if the registration is successful
        * false if the registration is not successful
        */
        return loginService.registerUser(username, email, password, confirmPassword); // Return Result
    }


    @PostMapping("login")
    public boolean login(@RequestParam String email, // Get username from the request
                         @RequestParam String password, // Get password from the request
                         HttpServletRequest httpServletRequest) {

        /*
        * Return @Boolean
        * true if the login is successful
        * false if the login is not successful
        */
        return loginService.loginUser(email, password); // Return Result
    }
}
