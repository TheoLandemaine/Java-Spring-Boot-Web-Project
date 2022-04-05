package com.codingfactory.porare.web;



import java.util.List;

import com.codingfactory.porare.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.codingfactory.porare.data.User;

@Controller
@RequestMapping("/")
public class PorareController {
	
	private final UserService userService;
	
	public PorareController(UserService personService) {
		this.userService = personService;
	}


	@GetMapping("users")
	public String getUsers(Model model) {

		List<User> users = userService.getAllUsers();
		
		model.addAttribute("users", users);
		return "users/index";
	}

	@GetMapping("register")
	public String register() {
		return "register/index";
	}
	

}
