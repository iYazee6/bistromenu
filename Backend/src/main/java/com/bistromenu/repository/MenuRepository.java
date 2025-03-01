package com.bistromenu.repository;

import com.bistromenu.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    // List<Menu> findByRestaurantId(Long restaurantId);
}
