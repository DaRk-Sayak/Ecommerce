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
  perviousCategoryId:number=1;
  search:boolean=false;

  pageNo:number=1;
  pageSize:number=2;
  theTotalElement:number=0;


  constructor(private productService: ProductService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }
  updatePageSize(value:string){
    this.pageSize=+value;
    this.pageNo=1;
    this.listProducts();
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
    if(hasCategoryId){
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    if(this.perviousCategoryId!=this.currentCategoryId){
      this.pageNo=1;
    }
    this.perviousCategoryId=this.currentCategoryId;

    this.productService.getProductListPage(this.pageNo-1,this.pageSize,this.currentCategoryId).subscribe(
      data=>{
        this.products=data._embedded.products;
        this.pageNo=data.page.number+1;
        this.pageSize=data.page.size;
        this.theTotalElement=data.page.totalElements;
        console.log(this.theTotalElement)
      });
    }
  }


