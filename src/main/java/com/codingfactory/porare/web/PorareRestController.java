package com.codingfactory.porare.web;



import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codingfactory.porare.data.User;
import com.codingfactory.porare.service.UserService;

@RestController
@RequestMapping("/api/")
public class PorareRestController {
	
	private final UserService userService;
	
	public PorareRestController(UserService personService) {
		this.userService = personService;
	}


	@GetMapping("users")
	public List<User> getUsers() {

		return userService.getAllUsers();
		
		
	}
	

}
