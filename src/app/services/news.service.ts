import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post } from '../models/post.interface';

import { Country, Category } from '../models/country_category.interface';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  loading = false;

  // COUNTRIES DATA
  public countries: Country[] = [
    { name: 'México', sigla: 'mx' },
    { name: 'Estados Unidos', sigla: 'us' },
    { name: 'Reino unido', sigla: 'gb' },
    { name: 'Colombia', sigla: 'co' },
  ];

  // CATEGORIES DATA
  public categories: Category[] = [
    { name: 'Business', sigla: 'business' },
    { name: 'Entertainment', sigla: 'entertainment' },
    { name: 'Health', sigla: 'health' },
    { name: 'Science', sigla: 'science' },
    { name: 'Sports', sigla: 'sports' },
    { name: 'Technology', sigla: 'technology' },
  ];
  constructor(private http: HttpClient) {}

  getCountries(): Country[] {
    return this.countries;
  }

  getCategories(): Category[] {
    return this.categories;
  }

  // SEARCH POSTS REQUEST
  searchPosts(country: string = 'mx', category: string = 'business') {
    const filter = `${environment.baseUrlAPI}?country=${country}&category=${category}&apikey=a0659c4da9454c06bc2cc4431c3feb1f`;
    return this.http.get<Post[]>(filter);
  }
}
