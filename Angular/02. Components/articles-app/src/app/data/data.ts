import { Article } from '../models/article.model';
import { data } from './seed';

export class ArticleData {
  getData(): Article[] {
    let articles: Article[] = [];
    articles = data.map((article) => new Article(article.author, article.description, article.imageUrl, article.title));
    return articles;
  }
}
