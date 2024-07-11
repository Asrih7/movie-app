import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favoriteMovies: any[] = [];

  constructor() {
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
  }
}
