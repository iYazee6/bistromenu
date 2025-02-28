package com.bistromenu.service;

import com.bistromenu.model.Menu;
import com.bistromenu.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class MenuService {

    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    // ✅ Dummy data for publicly accessible method
    public List<Menu> getMenuByRestaurant() {
        return Arrays.asList(
            new Menu(1L, "Pasta Carbonara", "Creamy Italian pasta with bacon", 12.99, 1L),
            new Menu(2L, "Margherita Pizza", "Classic pizza with mozzarella and basil", 10.99, 1L),
            new Menu(3L, "Cheeseburger", "Beef burger with cheese and lettuce", 8.99, 2L)
        );
    }

    // ✅ Retrieves menu for a specific restaurant from the database
    public List<Menu> getMenuByRestaurantId(Long restaurantId) {
        return menuRepository.findByRestaurantId(restaurantId);
    }
}
