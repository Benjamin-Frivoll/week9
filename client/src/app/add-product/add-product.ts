import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
  product: Product = { id: 0, name: '', description: '', price: 0, units: 0 };
  submitting = false;
  message = '';
  isError = false;

  constructor(private productService: ProductService, private router: Router) {}

  onSubmit() {
    this.submitting = true;
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        this.message = 'Product added!';
        this.isError = false;
        setTimeout(() => this.router.navigate(['/products']), 500);
      },
      error: (err) => {
        this.submitting = false;
        this.isError = true;
        this.message = err.status === 409
          ? 'A product with that ID already exists.'
          : 'Failed to add product.';
      }
    });
  }
}
