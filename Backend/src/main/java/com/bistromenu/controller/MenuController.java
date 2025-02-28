package com.bistromenu.controller;

import com.bistromenu.model.Menu;
import com.bistromenu.service.MenuService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    // ✅ Publicly accessible method (no authentication required)
    @GetMapping("/menuExrestaurant")
    public List<Menu> getMenuByRestaurant() {
        return menuService.getMenuByRestaurant();
    }

    // ✅ Protected method (requires authentication)
    @GetMapping("/byRestaurant/{restaurantId}")
    @PreAuthorize("isAuthenticated()")  // 🔒 Requires authentication
    public List<Menu> getMenuByRestaurantId(@PathVariable Long restaurantId) {
        return menuService.getMenuByRestaurantId(restaurantId);
    }
}
