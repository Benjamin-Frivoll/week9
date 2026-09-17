import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit() { this.loadProducts(); }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => { this.products = data; this.loading = false; },
      error: (err) => {
        this.error = 'Failed to load products. Is the server running?';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onDelete(id: string) {
    if (!confirm('Delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => { this.error = 'Failed to delete product'; console.error(err); }
    });
  }
}
