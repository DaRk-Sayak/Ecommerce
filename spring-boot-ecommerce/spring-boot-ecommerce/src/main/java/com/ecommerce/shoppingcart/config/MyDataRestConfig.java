package com.ecommerce.shoppingcart.config;
import com.ecommerce.shoppingcart.entity.Product;
import com.ecommerce.shoppingcart.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] unsupportedAction={HttpMethod.PUT,HttpMethod.POST,HttpMethod.DELETE};
        //disable HTTP Method For Product Like PUT POST DELETE
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedAction)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedAction)));

        //disable HTTP Method For ProductCategory Like PUT POST DELETE
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedAction)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedAction)));
    }
}
