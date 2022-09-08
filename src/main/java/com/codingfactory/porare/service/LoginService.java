package com.codingfactory.porare.service;

/*
 * UserService
 * Last update : 06/04/2022
 *
 * @author Loule95450
 * @version 1.0
 * @since 06/04/2022
 */

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import static com.codingfactory.porare.service.UserService.userTools;

/**
 * @param jdbcTemplate Import JdbcTemplate
 */
@Service
public record LoginService(JdbcTemplate jdbcTemplate) {

    public String registerUser(String username, String email, String password, String confirmPassword) {
        try { // Try to get all users from the database
            if (password.equals(confirmPassword)) { // Check if the password and the confirm password are the same

                // Crypt the password
                try {
                    // Create MessageDigest instance for MD5
                    MessageDigest md = MessageDigest.getInstance("MD5");

                    // Add password bytes to digest
                    md.update(password.getBytes());

                    // Get the hash's bytes
                    byte[] bytes = md.digest();

                    // This bytes[] has bytes in decimal format. Convert it to hexadecimal format
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < bytes.length; i++) {
                        sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
                    }

                    // Get complete hashed password in hex format
                    password = sb.toString();
                } catch (NoSuchAlgorithmException e) {
                    e.printStackTrace();
                    return "false";
                }

                String sql = "SELECT COUNT(*) FROM user WHERE u_username = ? OR u_email = ?";
                int count = jdbcTemplate.queryForObject(sql, Integer.class, username, email);

                if (count == 0) { // Check if the username is already in the database
                    // Insert the query in the variable
                    sql = "INSERT INTO user (u_username, u_email, u_password) VALUES (?, ?, ?)";

                    // Execute the query
                    jdbcTemplate.update(sql, username, email, password);

                    // Get User ID
                    sql = "SELECT u_id FROM user WHERE u_username = ?";
                    int userId = jdbcTemplate.queryForObject(sql, Integer.class, username);

                    // Create JWT token
                    try {
                        Algorithm algorithm = Algorithm.HMAC256(password);
                        // Create Token variable to create JWT token and return this token
                        return JWT.create().withClaim("userId", userId).withIssuer("auth0").sign(algorithm);
                    } catch (JWTCreationException exception) {
                        //Invalid Signing configuration / Couldn't convert Claims
                        return "false";
                    }
                } else {
                    return "false";
                }
            } else { // If the password and the confirm password are different
                System.out.println("Password and confirm password are not the same");
                return "false";
            }
        } catch (Exception e) { // Catch any exceptions
            e.printStackTrace();
            return "false";
        }
    }

    public String loginUser(String email, String password) {
        try { // Try to get all users from the database
            // Crypt the password
            try {
                // Create MessageDigest instance for MD5
                MessageDigest md = MessageDigest.getInstance("MD5");

                // Add password bytes to digest
                md.update(password.getBytes());

                // Get the hash's bytes
                byte[] bytes = md.digest();

                // This bytes[] has bytes in decimal format. Convert it to hexadecimal format
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < bytes.length; i++) {
                    sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
                }

                // Get complete hashed password in hex format
                password = sb.toString();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
                return "false";
            }

            String sql = "SELECT COUNT(*) FROM user WHERE u_email = ? AND u_password = ?";

            int count = jdbcTemplate.queryForObject(sql, Integer.class, email, password);

            if (count == 1) { // Check if the username is already in the database

                // Get User ID
                sql = "SELECT u_id FROM user WHERE u_email = ?";
                int userId = jdbcTemplate.queryForObject(sql, Integer.class, email);

                // Create JWT token
                try {
                    Algorithm algorithm = Algorithm.HMAC256(password);
                    // Create Token variable to create JWT token and return this token
                    return JWT.create().withClaim("userId", userId).withIssuer("auth0").sign(algorithm);
                } catch (JWTCreationException exception) {
                    //Invalid Signing configuration / Couldn't convert Claims
                    return "false";
                }
            } else {
                return "false";
            }
        } catch (Exception e) { // Catch any exceptions
            e.printStackTrace();
            return "false";
        }
    }
}