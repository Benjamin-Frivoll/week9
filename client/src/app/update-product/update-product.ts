import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct implements OnInit {
  product: Product | null = null;
  productId = '';
  loading = true;
  submitting = false;
  message = '';
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.productService.getProducts().subscribe({
      next: (products) => {
        const found = products.find(p => p._id === this.productId);
        if (found) {
          this.product = { ...found };
        } else {
          this.message = 'Product not found';
          this.isError = true;
        }
        this.loading = false;
      },
      error: () => {
        this.message = 'Failed to load product';
        this.isError = true;
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (!this.product) return;
    this.submitting = true;
    const { name, description, price, units } = this.product;
    this.productService.updateProduct(this.productId, { name, description, price, units })
      .subscribe({
        next: () => {
          this.message = 'Product updated!';
          this.isError = false;
          setTimeout(() => this.router.navigate(['/products']), 500);
        },
        error: () => {
          this.submitting = false;
          this.isError = true;
          this.message = 'Failed to update product.';
        }
      });
  }
}
