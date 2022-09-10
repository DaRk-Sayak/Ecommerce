package com.ecommerce.shoppingcart.dao;

import com.ecommerce.shoppingcart.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.domain.Pageable;
@Repository
@CrossOrigin
public interface ProductRepo extends JpaRepository<Product,Long> {
    Page<Product> findByCategoryId(@Param("id") Long id,Pageable pageable);
}
