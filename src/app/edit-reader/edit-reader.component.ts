import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import {DataService} from '../core/data.service';
import {BadgeService} from '../core/badge.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [],
  providers: [ BadgeService ]
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;
  currentBadge: string;

  constructor(private route: ActivatedRoute, private dataService: DataService, private badgeService: BadgeService) { }

  ngOnInit() {
    const readerID: number = +this.route.snapshot.params['id'];
    this.selectedReader = this.dataService.getReaderById(readerID);
    this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead)
  }

  saveChanges() {
    console.warn('Save reader not yet implemented.');
  }
}
