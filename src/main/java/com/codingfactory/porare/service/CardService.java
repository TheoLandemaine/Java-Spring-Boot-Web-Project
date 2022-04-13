package com.codingfactory.porare.service;

import org.springframework.jdbc.core.JdbcTemplate;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

@Service
public record CardService(JdbcTemplate jdbcTemplate) {

    // add card
    public void addCard(String token, String cardId) {
        DecodedJWT jwt = JWT.decode(token);

        String sql = "INSERT INTO card (c_id, c_fk_user_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, jwt.getClaim("userId"), cardId);

    }

    // delete card
    public void deleteCard(int c_id, String token) {
        DecodedJWT jwt = JWT.decode(token);

        String sql = "DELETE FROM card WHERE u_id = ? AND c_id = ? LIMIT 1";
        jdbcTemplate.update(sql, jwt.getClaim("userId"), c_id);
    }


}
