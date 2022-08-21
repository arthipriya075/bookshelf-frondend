import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { BookRestService } from '../service/book-rest.service';

export class Book {

  constructor(
    public id: number,
    public title: string,
    public authorName: string,
    public genre: String,
    public rating: number
  ) {}
}

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  books: Book[] = []
  deleteMessage = ''
  username = ''

  constructor(
    private bookRestService: BookRestService,
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    let user = this.basicAuthenticationService.getAuthenticatedUser();
    if(user) {
      this.username = user
    }
    this.refreshBooks();
  }

  refreshBooks() {
    if(this.username) {
      this.bookRestService.retrieveAllBooks(this.username).subscribe(
        response => this.books = response
      );
    }
  }

  deleteBook(id: number) {
    if(this.username) {
      this.bookRestService.deleteBook(this.username, id).subscribe(
        response => {
          this.deleteMessage = `Deletion of book ${id} successful!`;
          this.refreshBooks();
        }
      )
    }
  }

  updateBook(id: number) {
    this.router.navigate(['bookform', id]);
  }

  addBook() {
    this.router.navigate(['bookform', -1]);
  }
}
