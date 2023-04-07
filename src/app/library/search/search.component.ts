import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { SideNavService } from '../../shared/sideNav.service';
import { BreakpointService } from 'src/app/shared/breakpoint.service';
import { SearchFormat } from 'src/app/shared/listItems.json';
import { newMovieService } from 'src/app/shared/newMovie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [newMovieService],
})
export class SearchComponent implements OnInit {
  isMobile: boolean;
  currentScreenWidth: string;
  enteredSearchValue: string = '';
  enteredFormatValue: string = '';
  public allGenres: any;
  formats;
  constructor(
    private bPs: BreakpointService,
    private newMovieService: newMovieService
  ) {}

  @Output()
  searchtextChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  searchFormatChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  searchGenreChanged: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.bPs.getSize().subscribe((value) => {
      this.currentScreenWidth = value;
      this.checkScreenWidth(value);
    });
    this.newMovieService.fetchGenres().subscribe((data) => {
      this.allGenres = data['genres'];
    });
    this.formats = SearchFormat;
  }

  checkScreenWidth(value) {
    if (this.currentScreenWidth == 'XSmall') {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  onsearchtextchanged() {
    this.searchtextChanged.emit(this.enteredSearchValue);
  }
  onsearchFormatchanged(value) {
    this.searchFormatChanged.emit(value);
  }
  onsearchGenrechanged(value) {
    this.searchGenreChanged.emit(value);
  }
}
