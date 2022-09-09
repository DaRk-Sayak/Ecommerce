package com.ecommerce.shoppingcart.dao;

import com.ecommerce.shoppingcart.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
public interface ProductRepo extends JpaRepository<Product,Long> {
}
