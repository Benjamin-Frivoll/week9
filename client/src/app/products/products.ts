import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {
    console.log('[Products] constructor');
  }

  ngOnInit() {
    console.log('[Products] ngOnInit');
    this.loadProducts();
  }

  loadProducts() {
    console.log('[Products] loadProducts start');
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('[Products] got data:', data);
        this.products = data;
        this.loading = false;
        this.cdr.detectChanges();
        console.log('[Products] state updated, loading=', this.loading, 'products.length=', this.products.length);
      },
      error: (err) => {
        console.log('[Products] error:', err);
        this.error = 'Failed to load products. Is the server running?';
        this.loading = false;
        this.cdr.detectChanges();
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
