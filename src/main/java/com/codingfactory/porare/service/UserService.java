package com.codingfactory.porare.service;

/*
* UserService
* Last update : 05/04/2022
*
* @author Loule95450
* @version 1.0
* @since 05/04/2022
*/

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import com.codingfactory.porare.data.User;

@Service
public class UserService {

    /* Import JdbcTemplate */
    @Autowired
    private JdbcTemplate jdbcTemplate;

	public List<User> getAllUsers() {
        List<User> users = new ArrayList<>(); // Create a new list of users

        try { // Try to get all users from the database

            // Execute the query and get the result set from the database
            List<Map<String, Object>> rows = jdbcTemplate.queryForList("SELECT * FROM user"); // Execute the query

            for (Map<String, Object> row : rows) { // For each row in the result set
                User user = new User(); // Create a new user
                user.setUserId(String.valueOf((int) row.get("u_id"))); // Set the user id
                user.setUsername((String) row.get("u_username")); // Set the username
                user.setEmail((String) row.get("u_email")); // Set the password

                users.add(user); // Add the user to the list
            }
        } catch (Exception e) { // Catch any exceptions
            e.printStackTrace();
        }

		return users; // Return the list of users
	}

}
