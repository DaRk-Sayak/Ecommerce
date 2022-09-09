package com.ecommerce.shoppingcart.dao;

import com.ecommerce.shoppingcart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product,Long> {
}
