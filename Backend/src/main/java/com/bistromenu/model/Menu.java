package com.bistromenu.model;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "menu")
@AllArgsConstructor
@NoArgsConstructor
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String itemName;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "image")
    private String image;

    @Column(name = "calorie")
    private int calorie;

    @Column(name = "category")
    private String category;

    @Column(name = "lat", precision = 10, scale = 8)
    private BigDecimal lat;

    @Column(name = "lng", precision = 10, scale = 8)
    private BigDecimal lng;

    // private Long restaurantId; // Foreign key reference
}
