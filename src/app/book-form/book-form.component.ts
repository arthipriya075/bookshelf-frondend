import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from '../basic-authentication.service';
import { Book } from '../list-books/list-books.component';
import { BookRestService } from '../service/book-rest.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  id: number = -1;
  book: Book = new Book(this.id, '', '', '' , 0);
  username = ''

  constructor(
    private route: ActivatedRoute,
    private bookService : BookRestService,
    private router: Router,
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    let user = this.basicAuthenticationService.getAuthenticatedUser();
    if(user) {
      this.username = user;
    }
    this.id = this.route.snapshot.params['id'];
    if(this.id != -1) {
      this.bookService.retrieveBook(this.username, this.id).subscribe(
        data => this.book = data
      )
    }
  }

  saveBook() {
    if(this.id == -1) {
      this.bookService.createBook(this.username, this.book).subscribe(
        response => this.router.navigate(['books'])
      )
    }
    else {
      this.bookService.updateBook(this.username, this.id, this.book).subscribe(
        response => this.router.navigate(['books'])
      )
    }
  }
}
