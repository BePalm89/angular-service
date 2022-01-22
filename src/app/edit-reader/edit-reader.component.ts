import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import {DataService} from '../core/data.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: []
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    const readerID: number = +this.route.snapshot.params['id'];
    this.selectedReader = this.dataService.getReaderById(readerID);
  }

  saveChanges() {
    console.warn('Save reader not yet implemented.');
  }
}
