package com.codingfactory.porare.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public record PackService(JdbcTemplate jdbcTemplate) {

    public void addPack(String p_type, int token) {
        String sql = "INSERT INTO pack (p_type, u_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, p_type, token);
    }

    public void deletePack(String p_type, int token) {
        String sql = "DELETE FROM pack WHERE u_id = ? AND p_type = ? LIMIT 1";
        jdbcTemplate.update(sql, token, p_type);
    }

}
