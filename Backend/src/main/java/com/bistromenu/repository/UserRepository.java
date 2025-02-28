package com.bistromenu.repository;

import com.bistromenu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);  // ✅ Add this if used in authentication
}