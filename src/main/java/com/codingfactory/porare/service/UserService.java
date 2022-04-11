package com.codingfactory.porare.service;

/*
 * UserService
 * Last update : 05/04/2022
 *
 * @author Loule95450
 * @version 1.0
 * @since 05/04/2022
 */

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.codingfactory.porare.data.User;
import com.codingfactory.porare.tools.Global;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @param jdbcTemplate Import JdbcTemplate
 */
@Service
public record UserService(JdbcTemplate jdbcTemplate) {

    static Global global = new Global();

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

    public List<User> getUserInformations(String token) {
        List<User> users = new ArrayList<>(); // Create a new list of users

        try {
            Integer userId = global.checkToken(token, jdbcTemplate);

            // Get User Informations
            List<Map<String, Object>> userInformations = jdbcTemplate.queryForList("SELECT * FROM user WHERE u_id = '" + userId + "'");

            // Get User Informations
            for (Map<String, Object> userInformation : userInformations) {
                User user = new User();
                user.setUserId(String.valueOf((int) userInformation.get("u_id")));
                user.setUsername((String) userInformation.get("u_username"));
                user.setEmail((String) userInformation.get("u_email"));

                users.add(user);
            }

            return users; // Return the list of users
        } catch (JWTVerificationException exception) {
            //Invalid signature/claims
            User user = new User();
            users.add(user);

            return users;
        }
    }

    public int getUserCoins(String token) {
        try {
            // Get User Id
            Integer userId = global.checkToken(token, jdbcTemplate);

            String sql = "SELECT u_coin FROM user WHERE u_id = '" + userId + "'";

            // Fetch element and console log the password
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            // Get the user password from the users list
            int coins = (int) rows.get(0).get("u_coin");

            return coins;
        } catch (JWTDecodeException exception) {
            //Invalid token
            return 0;
        }
    }
}
