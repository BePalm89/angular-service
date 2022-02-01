import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { Reader } from '../models/reader';
import { allBooks, allReaders } from '../data';
import { Book } from '../models/book';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {BookTrackerError} from '../models/bookTrackerError';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  mostPopularBook = allBooks[0];

  constructor(private loggerService: LoggerService, private http: HttpClient) {}

  getAuthorRecommendation(readrID: Number): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (readrID > 0) {
          resolve('Dr. Seuss')
        } else {
          reject('Invalid reader ID')
        }
      }, 2000)
    })
  }

  getAllReaders(): Observable<Reader[] | BookTrackerError>  {
    return this.http.get<Reader[]>('api/readers')
        .pipe(
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse): Observable<BookTrackerError>{
    const dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return throwError(dataError)
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Book[] {
    return allBooks
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook
  }
}
