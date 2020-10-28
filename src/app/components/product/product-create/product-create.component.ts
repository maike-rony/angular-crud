import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product;
  public productForm: FormGroup;

  constructor(
              private productService: ProductService, 
              private router: Router)  { }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });    
    
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.productForm.controls[controlName].hasError(errorName);
  }

  public createFormProductValidate = (createFormValue) => {
    console.log(this.productForm)
    if (this.productForm.valid) {    
      this.createProduct(createFormValue);
    }
  }

  createProduct(createFormValue): void {    
      this.product = {
        name: createFormValue.name,
        price: createFormValue.price
      }

      this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Produto Cadastrado com Sucesso!")
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
