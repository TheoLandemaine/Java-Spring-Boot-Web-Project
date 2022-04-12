package com.codingfactory.porare.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import static com.codingfactory.porare.service.UserService.userTools;

@Service
public record PackService(JdbcTemplate jdbcTemplate) {


    public String addPack(String token, String packType, int packPrice) {
        try {

          Integer userId = userTools.checkToken(token, jdbcTemplate);
            String sql = "INSERT INTO pack (p_type, p_fk_user_id) VALUES (?, ?)";
            jdbcTemplate.update(sql, packType, userId);
            int coins = jdbcTemplate.queryForObject("SELECT u_coin FROM user WHERE u_id = ?", Integer.class, userId);

            coins -= packPrice;

            String sql2 = "UPDATE user SET u_coin = ? WHERE u_id = ?";
            jdbcTemplate.update(sql2, coins, userId);
            return "true";
        } catch (Exception e) {
            return "false";
        }
    }

    public void deletePack(String p_type, String token) {
        String sql = "DELETE FROM pack WHERE p_fk_user_id = ? AND p_type = ? LIMIT 1";
        jdbcTemplate.update(sql, token, p_type);
    }

}
