import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    console.log('[Update] productId from URL:', this.productId);

    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('[Update] got products:', products.length);
        const found = products.find(p => p._id === this.productId);
        console.log('[Update] found match:', found);
        if (found) {
          this.product = { ...found };
        } else {
          this.message = 'Product not found';
          this.isError = true;
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('[Update] error:', err);
        this.message = 'Failed to load product';
        this.isError = true;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit() {
    if (!this.product) return;
    this.submitting = true;
    const { name, description, price, units } = this.product;
    console.log('[Update] submitting update for', this.productId, { name, description, price, units });

    this.productService.updateProduct(this.productId, { name, description, price, units })
      .subscribe({
        next: (res) => {
          console.log('[Update] success:', res);
          this.message = 'Product updated!';
          this.isError = false;
          this.cdr.detectChanges();
          setTimeout(() => this.router.navigate(['/products']), 500);
        },
        error: (err) => {
          console.log('[Update] update error:', err);
          this.submitting = false;
          this.isError = true;
          this.message = 'Failed to update product.';
          this.cdr.detectChanges();
        }
      });
  }
}
