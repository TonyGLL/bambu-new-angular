import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

// INTERFACES
import { Post } from '../../models/post.interface';
import { Country, Category } from '../../models/country_category.interface';

// SERVICES
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  posts: Post[] = [];
  public country: string;
  public category: string;

  public selectedCountry: Country = { name: 'México', sigla: 'mx' };
  public selectedCategory: Category = {
    name: 'Business',
    sigla: 'business',
  };

  public countries: Country[];
  public categories: Category[];

  constructor(public newsService: NewsService) {}

  // GET THE COUNTRY OPTION DATA AND SENT IT TO THE HTTP REQUEST
  onSelectCountry(name: any): void {
    this.newsService.loading = true;
    this.country = name;
    this.newsService
      .searchPosts(this.country, this.category)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.newsService.loading = false;
        const { articles } = res;
        this.posts = [...articles];
      });
  }

  // GET THE CATEGORY OPTION DATA AND SENT IT TO THE HTTP REQUEST
  onSelectCategory(name: string): void {
    this.newsService.loading = true;
    this.category = name;
    this.newsService
      .searchPosts(this.country, this.category)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.newsService.loading = false;
        const { articles } = res;
        this.posts = [...articles];
      });
  }

  ngOnInit(): void {
    this.getDataFromService();
    this.countries = this.newsService.getCountries();
    this.categories = this.newsService.getCategories();
  }

  // SEND THE DATA TO THE HTTP REQUEST
  getDataFromService(): void {
    this.newsService.loading = true;
    this.newsService
      .searchPosts(this.country, this.category)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.newsService.loading = false;
        const { articles } = res;
        this.posts = [...articles];
      });
  }

  // REDUCE THE TITLE CHARACTERS
  lessTitleCharacters(text: string): string {
    const less = text;
    const separate = `${less.split('').slice(0, 25).join('')}...`;
    return separate;
  }

  // REDUCE THE DESCRIPTION CHARACTERS
  lessDescriptionCharacters(text: string): string {
    const less = text;
    const separate = less.split('').slice(0, 34).join('');
    return separate;
  }

  // REDUCE THE AUTHOR CHARACTERS
  lessAuthor(text: string): string {
    const less = text;
    const separate = less.split('').slice(0, 20).join('');
    return separate;
  }

  // CONVERT THE DATE
  convertDate(date: string): string {
    const toConvert = date;
    const x = toConvert.split('').slice(0, 10).join('');
    const y = x.split('-').join('-');
    return y;
  }
}
