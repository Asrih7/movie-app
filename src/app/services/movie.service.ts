import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    private apiKey: string = environment.apiKey;
    private apiUrl: string = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  searchMovies(query: string) {
    return this.http.get('/api/movie/search', { params: { query } });
  }

  getMovieDetails(id: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.apiUrl}/movie/${id}`, { params });
  }

  getCategories(): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get(`${this.apiUrl}`);
  }
}
