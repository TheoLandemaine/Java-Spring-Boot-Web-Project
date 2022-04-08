package com.codingfactory.porare.data;

/*
* User
* Last update : 05/04/2022
*
* @author Loule95450
* @version 1.0
* @since 05/04/2022
*/

import java.io.Serializable;


public class User implements Serializable {

	// Creation of the attributes of the class
	private String userId;
	private String username;
	private String email;
	private String password;

	public User() {

	}

	// Creation of the constructor of the class
	public User(String userId, String username, String email) {
		this.userId = userId; // Creation of the attribute userId
		this.username = username; // Creation of the attribute username
		this.email = email; // Creation of the attribute password
		this.password = password;
	}

	public String getUserId() {
		return userId; // Return the value of the attribute userId
	}

	public void setUserId(String userId) {
		this.userId = userId; // Set the value of the attribute userId
	}

	public String getUsername() {
		return username; // Return the value of the attribute username
	}

	public void setUsername(String username) {
		this.username = username; // Set the value of the attribute username
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String u_password) {
	}

	public String getPassword() {
		return password;
	}
}
