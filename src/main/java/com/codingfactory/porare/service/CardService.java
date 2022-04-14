package com.codingfactory.porare.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static com.codingfactory.porare.service.UserService.userTools;

@Service
public record CardService(JdbcTemplate jdbcTemplate) {
    public boolean addCard(String token, String cardId) {
        try {
            /*
             * Add card to User
             */
            Integer userId = userTools.checkToken(token, jdbcTemplate);
            String sql = "INSERT INTO card (c_id, c_fk_user_id) VALUES (?, ?)";
            jdbcTemplate.update(sql, cardId, userId);
            return true;
        } catch (Exception e) {
            /*
             * Error:
             * User not found
             * Card not found
             * SQL error
             * ...
             */
            return false;
        }
    }

    public boolean deleteCard(String token, String cardId, String cardType) {
        if (Objects.equals(cardType, "undefined")) {
            cardType = "Common";
        }

        try {

            // Check if user has card
            Integer userId = userTools.checkToken(token, jdbcTemplate);
            String cardIdInt = jdbcTemplate.queryForObject("SELECT c_id FROM card WHERE c_id = ? AND c_fk_user_id = ?", String.class, cardId, userId);
            System.out.println(cardIdInt);
            /*
             * Check if user have card. If not, return false
             * If user have card, refund user and delete card from user
             */
            if (cardIdInt != null) {



            int coins = jdbcTemplate.queryForObject("SELECT u_coin FROM user WHERE u_id = ?", Integer.class, userId);

            int cardPrice = jdbcTemplate.queryForObject("SELECT r_price FROM rarity WHERE r_rarity = ?", Integer.class, cardType);

            coins += cardPrice;

            String sql = "UPDATE user SET u_coin = ? WHERE u_id = ?";
            jdbcTemplate.update(sql, coins, userId);

            sql = "DELETE FROM card WHERE c_fk_user_id = ? AND c_id = ? LIMIT 1";
            jdbcTemplate.update(sql, userId, cardId);
            return true;
            } else {
                return false;
            }
            
        } catch (Exception e) {
            System.out.println(e);
            /*
             * Error:
             * User not found
             * Card not found
             * Card Price not found
             * SQL error
             * ...
             */
            return false;
        }
    }

    public int getCardPrice(String cardType) {
        try {
            /*
             * Just return get user price
             */
            return jdbcTemplate.queryForObject("SELECT r_price FROM rarity WHERE r_rarity = ?", Integer.class, cardType);
        } catch (Exception e) {
            /*
             * Error:
             * Card not found
             */

            return -1;
        }
    }
}
