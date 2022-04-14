package com.codingfactory.porare.service;

/*
 * UserService
 * Last update : 05/04/2022
 *
 * @author Loule95450
 * @version 1.0
 * @since 05/04/2022
 */

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.codingfactory.porare.data.User;
import com.codingfactory.porare.tools.UserTools;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

/**
 * @param jdbcTemplate Import JdbcTemplate
 */
@Service
public record UserService(JdbcTemplate jdbcTemplate) {

    static UserTools userTools = new UserTools();

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
            Integer userId = userTools.checkToken(token, jdbcTemplate);

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

    public Boolean editUsername(String token, String newusername) {
        try {
            Integer userId = userTools.checkToken(token, jdbcTemplate);

            // Update the username
            jdbcTemplate.update("UPDATE user SET u_username = '" + newusername + "' WHERE u_id = '" + userId + "'");

            return true;
        } catch (JWTVerificationException exception) {
            //Invalid signature/claims
            return false;
        }
    }

    public Boolean editPassword(String token, String actualPassword, String newPassword, String newPasswordConfirmation) {
        try {
            Integer userId = userTools.checkToken(token, jdbcTemplate);

            // Check if the actual password is correct
            List<Map<String, Object>> userInformations = jdbcTemplate.queryForList("SELECT * FROM user WHERE u_id = '" + userId + "'");

            for (Map<String, Object> userInformation : userInformations) {
                if (!((String) userInformation.get("u_password")).equals(actualPassword)) {
                    return false;
                }
            }

            // Check if the new password and the new password confirmation are the same
            if (!newPassword.equals(newPasswordConfirmation)) {
                return false;
            }

            // Update the password
            jdbcTemplate.update("UPDATE user SET u_password = '" + newPassword + "' WHERE u_id = '" + userId + "'");

            return true;
        } catch (JWTVerificationException exception) {
            //Invalid signature/claims
            return false;
        }
    }

    public int getUserCoins(String token) {
        try {
            // Get User Id
            Integer userId = userTools.checkToken(token, jdbcTemplate);

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
            System.out.println("Get User Packs");
            int userId = userTools.checkToken(token, jdbcTemplate);
            String sql = "SELECT * FROM pack WHERE p_fk_user_id = '" + userId + "'";

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
            String sql = "SELECT c_id FROM card WHERE c_fk_user_id = '" + userTools.checkToken(token, jdbcTemplate) + "'";

            // Fetch element and console log the password
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            for (Map<String, Object> row : rows) {
                cards.add((String) row.get("c_id"));
            }

            // Return the list of cards
            return cards;
        } catch (JWTDecodeException exception) {
            //Invalid token
            return cards;
        }
    }

    public int randomGiftToken(String token) {
        try {
            return 5;
        } catch (Exception e) {
            return -1;
        }
    }

    public boolean giveGift(String token, int randomGift) {
        try {
            int userId = userTools.checkToken(token, jdbcTemplate);
        int coins = getUserCoins(token);
        coins += randomGift;
        jdbcTemplate.update("UPDATE user SET u_coin = '" + coins + "' WHERE u_id = '" + userId + "'");

        jdbcTemplate.update( "UPDATE user SET u_gift = 0 WHERE u_id = '" + userId + "'");
        return true;
        } catch (JWTDecodeException exception) {
            //Invalid token
            return false;
        }
    }

    public boolean getDailyAccess(String token) {
        try {
            int userId = userTools.checkToken(token, jdbcTemplate);
            // Get the current value of the boolean value u_gift then if it's equal to false
            // then we can give the user a gift
            String sql = "SELECT u_gift FROM user WHERE u_id = '" + userId + "'";

            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            boolean gift = (boolean) rows.get(0).get("u_gift");

            if(gift) {
                return true;
            } else {
                return false;
            }






        } catch (JWTDecodeException exception) {
            //Invalid token
            return false;
        }
    }

}
