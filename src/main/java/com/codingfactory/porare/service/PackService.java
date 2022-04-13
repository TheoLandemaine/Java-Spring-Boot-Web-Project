package com.codingfactory.porare.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import static com.codingfactory.porare.service.UserService.userTools;

@Service
public record PackService(JdbcTemplate jdbcTemplate) {
    public boolean addPack(String token, String packType, int packPrice) {
        try {
            /*
            * Get user coins and calculate if the user has enough coin to make the purchase
            */
            Integer userId = userTools.checkToken(token, jdbcTemplate);
            int coins = jdbcTemplate.queryForObject("SELECT u_coin FROM user WHERE u_id = ?", Integer.class, userId);
            coins -= packPrice;
            if (coins > 0) {
                /*
                 * Remove coins from user
                 */
                String sql2 = "UPDATE user SET u_coin = ? WHERE u_id = ?";
                jdbcTemplate.update(sql2, coins, userId);

                /*
                 * Add pack to user
                 */
                String sql = "INSERT INTO pack (p_type, p_fk_user_id) VALUES (?, ?)";
                jdbcTemplate.update(sql, packType, userId);

                /* Everything is ok ? Return ✨ True ✨ */
                return true;
            } else {
                /*
                 * Error :
                 * Not enough coins
                 */

                return false;
            }
        } catch (Exception e) {
            /*
             * Error :
             * User not found
             * Token not found
             * Sql error
             * ...
             */
            return false;
        }
    }

    public boolean deletePack(String p_type, String token) {
        try {
            /*
            * Check if user has pack. If not, return false
            * If yes, delete pack
            */

            Integer userId = userTools.checkToken(token, jdbcTemplate);

            System.out.println(userId);

            String sql = "SELECT COUNT(*) FROM pack WHERE p_fk_user_id = ? AND p_type = ?";
            System.out.println(sql);
            int count = jdbcTemplate.queryForObject(sql, Integer.class, userId, p_type);

            if (count > 0) {
                sql = "DELETE FROM pack WHERE p_fk_user_id = ? AND p_type = ? LIMIT 1";
                jdbcTemplate.update(sql, userId, p_type);

                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            /*
             * Error :
             * User not found
             * Token not found
             * Sql error
             * ...
             */
            return false;
        }
    }

    public int getPackPrice(String p_type) {
        try {
            /*
            * Get Pack price and return it
             */

            String sql = "SELECT pp_price FROM pack_price WHERE pp_type = ?";
            return jdbcTemplate.queryForObject(sql, Integer.class, p_type);
        } catch (Exception e) {
            /*
             * Error :
             * Pack not found
             * Sql error
             * ...
             */

            return -1;
        }
    }
}
