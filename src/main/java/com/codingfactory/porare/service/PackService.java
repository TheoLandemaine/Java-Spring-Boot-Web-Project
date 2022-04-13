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

    public String deletePack(String p_type, String token) {
        try {
            Integer userId = userTools.checkToken(token, jdbcTemplate);

            String sql = "DELETE FROM pack WHERE p_fk_user_id = ? AND p_type = ? LIMIT 1";
            jdbcTemplate.update(sql, userId, p_type);
            System.out.println("delete pack");
            return "true";
        } catch (Exception e) {
            return "false";
        }
    }

    public int getPackPrice(String p_type) {
        try {
            String sql = "SELECT pp_price FROM pack_price WHERE pp_type = ?";
            int price = jdbcTemplate.queryForObject(sql, Integer.class, p_type);
            return price;
        } catch (Exception e) {
            return -1;
        }
    }

}
