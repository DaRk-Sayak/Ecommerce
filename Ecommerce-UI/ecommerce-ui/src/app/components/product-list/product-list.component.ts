import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[]=[];
  currentCategoryId: number=1;
  search:boolean=false;
  constructor(private productService: ProductService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

  //Getting the data from the ProductService and putting it in array

  listProducts() {
    this.search=this.route.snapshot.paramMap.has('keyword');
    if(this.search){
      this.handeleSearchProducts();
    }
    else{
      this.handeleListProducts();
    }
  }

  handeleSearchProducts() {
    const key:string|null=this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProduct(key).subscribe(
      data=>{
        this.products=data;
      }
    );
  }

  handeleListProducts(){
    const hasCategoryId :boolean=this.route.snapshot.paramMap.has('id');
    console.log(hasCategoryId);
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId=2;
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }

}
