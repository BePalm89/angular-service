import { Component, OnInit } from '@angular/core';

import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import {DataService} from '../core/data.service';
import {allBooks} from '../data';
import {LoggerService} from '../core/logger.service';
import {BookTrackerError} from '../models/bookTrackerError';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService, private loggersService: LoggerService) {
    this.loggersService.log('Creating the dashboard!')
  }

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    this.mostPopularBook = this.dataService.mostPopularBook;
    this.dataService.getAllReaders().subscribe(
        (response: Reader[] | BookTrackerError) => this.allReaders = <Reader[]>response,
        (err: BookTrackerError) => this.loggersService.log(err.friendlyMessage)
    );
    this.mostPopularBook = this.dataService.mostPopularBook;
    /*this.dataService.getAuthorRecommendation(1)
        .then(
            (author: string) => {
              this.loggersService.log(author);
              throw new Error('Problem in the success handler!')
            },
            (err: string) => this.loggersService.error(`The promise was rejected: ${err}`)
        ).catch((error: Error) => this.loggersService.error(error.message)) */
    this.getAuthorRecommendationAsync(1)
    this.loggersService.log('Done with dashboard initialization.')
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    try {
      const author: string = await this.dataService.getAuthorRecommendation(readerID);
      this.loggersService.log(author)
    } catch (error) {
      this.loggersService.error(error)
    }
  }

}
