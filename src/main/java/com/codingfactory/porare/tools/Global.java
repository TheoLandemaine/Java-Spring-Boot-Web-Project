package com.codingfactory.porare.tools;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class Global {
    /*
     * Here, we are declaring our global variables available to all classes in Project.
     */

    public Integer checkToken(String token, JdbcTemplate jdbcTemplate) {
        try {
            DecodedJWT jwt = JWT.decode(token);

            String sql = "SELECT u_id, u_password FROM user WHERE u_id = '" + jwt.getClaim("userId") + "'";

            // Fetch element and console log the password
            List<Map<String, Object>> rows = jdbcTemplate.queryForList(sql);

            // Get the user password from the users list
            String password = (String) rows.get(0).get("u_password");

            // Check if the password correspond to the token
            try {
                Algorithm algorithm = Algorithm.HMAC256(password);
                JWTVerifier verifier = JWT.require(algorithm)
                        .withIssuer("auth0")
                        .build(); //Reusable verifier instance
                DecodedJWT jwtVerifier = verifier.verify(token);

                // Good, if we get here, the token is valid
                // Return the user id
                return (Integer) rows.get(0).get("u_id");
            } catch (JWTVerificationException exception) {
                //Invalid signature/claims
                return null;
            }
        } catch (JWTDecodeException exception) {
            //Invalid token
            return null;
        }
    }
}
