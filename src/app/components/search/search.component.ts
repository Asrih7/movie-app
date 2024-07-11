import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: any[] = [];
  categories: any[] = [];
  years: number[] = [];
  selectedCategory: string = '';
  selectedYear: string = '';

  constructor(private router: Router, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getYears();
    this.search(); 
  }

  search(): void {
    if (this.query) {
      this.movieService.searchMovies(this.query).subscribe(
        (response: any) => {
          this.results = response.results;
        },
        (error: any) => {
          console.error('Error fetching movies:', error);
        }
      );
    }
  }

  getCategories(): void {
    this.movieService.getCategories().subscribe(response => {
      this.categories = response.genres;
    });
  }

  getYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  navigateToMovieDetail(id: number): void {
    this.router.navigate(['/movie', id]);
  }

  addToFavorites(movie: any): void {
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    if (!favoriteMovies.some((fav: any) => fav.id === movie.id)) {
      favoriteMovies.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      alert('Film ajouté aux favoris!');
    } else {
      alert('Ce film est déjà dans vos favoris.');
    }
  }

  getMoviePosterUrl(posterPath: string): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    } else {
      return 'assets/default-poster.jpg';
    }
  }

  isFavorite(movie: any): boolean {
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies') || '[]');
    return favoriteMovies.some((fav: any) => fav.id === movie.id);
  }
}
