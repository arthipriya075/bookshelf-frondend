import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { Book } from '../list-books/list-books.component';

@Injectable({
  providedIn: 'root'
})
export class BookRestService {

  constructor(private http: HttpClient) { }

  retrieveAllBooks(username: string) {
    return this.http.get<Book[]>(`${API_URL}/users/${username}/books`)
  }

  retrieveBook(username: string, id: number) {
    return this.http.get<Book>(`${API_URL}/users/${username}/books/${id}`)
  }

  deleteBook(username: string, id: number) {
    return this.http.delete(`${API_URL}/users/${username}/books/${id}`);
  }

  updateBook(username: string, id: number, book: Book) {
    return this.http.put(`${API_URL}/users/${username}/books/${id}`, book);
  }
  
  createBook(username: string, book: Book) {
    return this.http.post(`${API_URL}/users/${username}/books`, book);
  }
}
