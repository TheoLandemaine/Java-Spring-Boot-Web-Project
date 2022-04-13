package com.codingfactory.porare.service;

import org.springframework.jdbc.core.JdbcTemplate;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

import static com.codingfactory.porare.service.UserService.userTools;

@Service
public record CardService(JdbcTemplate jdbcTemplate) {

    // add card
    public String addCard(String token, String cardId) {
        System.out.println("addCard");
        System.out.println(token + " " + cardId);
        try {
            Integer userId = userTools.checkToken(token, jdbcTemplate);
            String sql = "INSERT INTO card (c_id, c_fk_user_id) VALUES (?, ?)";
            jdbcTemplate.update(sql, cardId, userId);
            return "true";
        } catch (Exception e) {
            return "false";
        }
    }

    // delete card
    public void deleteCard(int c_id, String token) {
        DecodedJWT jwt = JWT.decode(token);

        String sql = "DELETE FROM card WHERE u_id = ? AND c_id = ? LIMIT 1";
        jdbcTemplate.update(sql, jwt.getClaim("userId"), c_id);
    }


}
