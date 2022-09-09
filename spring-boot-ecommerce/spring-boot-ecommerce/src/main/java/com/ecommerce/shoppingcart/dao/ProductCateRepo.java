package com.ecommerce.shoppingcart.dao;

import com.ecommerce.shoppingcart.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "productCategory",path = "product-category")
public interface ProductCateRepo extends JpaRepository<ProductCategory,Long> {
}
