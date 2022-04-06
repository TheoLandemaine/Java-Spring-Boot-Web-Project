package com.codingfactory.porare.service;

/*
 * UserService
 * Last update : 06/04/2022
 *
 * @author Loule95450
 * @version 1.0
 * @since 06/04/2022
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class LoginService {

    /* Import JdbcTemplate */
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public boolean registerUser(String username, String email, String password, String confirmPassword) {
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
                    return false;
                }

                String sql = "SELECT COUNT(*) FROM user WHERE u_username = ? OR u_email = ?";

                int count = jdbcTemplate.queryForObject(sql, Integer.class, username, email);

                if (count == 0) { // Check if the username is already in the database
                    // Insert the query in the variable
                    sql = "INSERT INTO user (u_username, u_email, u_password) VALUES (?, ?, ?)";

                    // Execute the query
                    jdbcTemplate.update(sql, username, email, password);

                    // Return true if the query is executed
                    return true;
                } else {
                    return false;
                }
            } else { // If the password and the confirm password are different
                System.out.println("Password and confirm password are not the same");
                return false;
            }
        } catch (Exception e) { // Catch any exceptions
            e.printStackTrace();
            return false;
        }
    }
}
