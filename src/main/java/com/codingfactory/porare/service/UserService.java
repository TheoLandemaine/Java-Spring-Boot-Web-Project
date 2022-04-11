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

    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

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
    public List<String> getUserPacks(String token) {
        List<String> packs = new ArrayList<>();

        try {
            DecodedJWT jwt = JWT.decode(token);

            String sql = "SELECT p_id FROM pack WHERE u_id = '" + jwt.getClaim("userId") + "'";

            // Fetch element and console log the password
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            for (Map<String, Object> row : rows) {
                packs.add((String) row.get("p_type"));
            }

            return packs;
        } catch (JWTDecodeException exception) {
            //Invalid token
            return packs;
        }
    }

    public List<String> getUserCards(String token) {
        List<String> cards = new ArrayList<>();

        try {
            DecodedJWT jwt = JWT.decode(token);

            String sql = "SELECT c_id FROM card WHERE u_id = '" + jwt.getClaim("userId") + "'";

            // Fetch element and console log the password
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            for (Map<String, Object> row : rows) {
                cards.add((String) row.get("c_id"));
            }

            // Get the user password from the users list


            return cards;
        } catch (JWTDecodeException exception) {
            //Invalid token
            return cards;
        }
    }

        // Manage economy

        // TODO: If the user buys a pack, remove the coins from the user
        // TODO: If the user sells a card, add the coins from the user

        public void manageEconomy(String token, int price) {
        // If the user buys a pack, remove the coins from the user
        // If the user sells a card, add the coins from the user

            // Get the actual coins of the user from sql request
            int coins = getUserCoins(token);

            // If the user buys a pack, remove the coins from the user
            if (price < 0) {
                coins -= price;
            } else {
                coins += price;
            }

            String sql = "UPDATE user SET u_coin = ? WHERE u_id = ?";
            jdbcTemplate.update(sql, coins, token);


        }

}
