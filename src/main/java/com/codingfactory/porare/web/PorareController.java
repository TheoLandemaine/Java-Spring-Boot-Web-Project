package com.codingfactory.porare.web;



import java.util.List;

import com.codingfactory.porare.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
		return "login/register";
	}

	@GetMapping("login")
	public String login() {
		return "login/login";
	}

	@GetMapping("search")
	public String search() {
		return "search/index";
	}

	@GetMapping("profile")
	public String profile() { return "profile/index"; }

	@GetMapping("edit")
	public String editProfile() { return "profile/edit"; }

	@GetMapping("password")
	public String editPassword() { return "profile/editPassword"; }

	@GetMapping("myCards")
	public String cards() { return "profile/cards"; }

	@GetMapping("myPacks")
	public String packs() { return "profile/packs"; }

	@GetMapping("shop")
	public String shop() { return "shop/index";}


	

}
