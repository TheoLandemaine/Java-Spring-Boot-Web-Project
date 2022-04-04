package com.codingfactory.porare.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.codingfactory.porare.data.User;

@Service
public class UserService {
	
	public List<User> getAllUsers() {
		List<User> users = new ArrayList<>();
		users.add(new User("Jean", "Durand" ));
		users.add(new User("Pierre", "Dupont"));
		users.add(new User("Karine", "Dubois"));
		return users;
		
	}

}
