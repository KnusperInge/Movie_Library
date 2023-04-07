import { Component, HostListener, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { Movie } from '../shared/movie.model';
import { Router } from '@angular/router';
import { SideNavService } from '../shared/sideNav.service';
import { BreakpointService } from '../shared/breakpoint.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  collection$: Movie[] = [];
  inputCollection: Movie[] = [];
  searchcollection: Movie[] = [];
  public opened: boolean = false;
  public searchText: string = '';
  public searchFormat: string = '';
  public isSelected: boolean = false;
  private loadIndex: number = 18;
  private currentLoadIndex: number = 18;
  currentScreenWidth: string;
  isMobile: boolean;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private sns: SideNavService,
    private bPs: BreakpointService
  ) {}

  ngOnInit() {
    this.fetchMovies();

    this.sns.getValueSearchbar().subscribe((value) => {
      this.opened = value;
      if (!this.opened) {
        this.fetchMovies();
      }
    });

    this.sns.setValueSearchIcon(true);
    this.bPs.getSize().subscribe((value) => {
      this.currentScreenWidth = value;
      this.checkScreenWidth(value);
    });

    this.sns.getScrollValue().subscribe((value) => {
      if (value) {
        this.setCurrentIndex();
        setTimeout(() => {
          this.finsishArr();
          this.sns.setScrollValue(false);
        }, 500);
      }
    });
  }

  fetchMovies() {
    this.movieService.loadMovies().subscribe((res: Movie[]) => {
      this.inputCollection = res;
      this.finsishArr();
    });
  }

  finsishArr() {
    this.collection$ = [];
    for (let index = 0; index < this.currentLoadIndex; index++) {
      this.collection$.push(this.inputCollection[index]);
    }
  }

  setCurrentIndex() {
    if (this.inputCollection.length - this.loadIndex >= this.currentLoadIndex) {
      this.currentLoadIndex = this.currentLoadIndex + this.loadIndex;
    } else {
      this.currentLoadIndex =
        this.currentLoadIndex +
        (this.inputCollection.length - this.currentLoadIndex);
    }
  }

  checkScreenWidth(value) {
    if (this.currentScreenWidth == 'XSmall') {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  openDetail(item: string) {
    this.collection$ = [];
    this.router.navigate(['details/' + item]);
    this.sns.setValueSearchbar(false);
  }

  onSearchtextEntered(searchvalue: string) {
    this.changeSelectedState(searchvalue);
    this.setSelectedArr('title', searchvalue);
  }

  onSearchFormatEntered(value: string) {
    this.setSelectedArr('format', value);
  }

  setSelectedArr(Filter: string, value) {
    this.collection$ = [];
    if (value != '' || value == null) {
      this.inputCollection.forEach((element: any) => {
        if (
          element[Filter].toLocaleLowerCase().includes(
            value.toLocaleLowerCase()
          )
        ) {
          this.collection$.push(element);
        }
      });
    } else {
      this.finsishArr();
    }
  }
  onSearchGenreEntered(value: string) {
    console.log(value);
    this.collection$ = [];
    if (value != '') {
      this.inputCollection.forEach((element: any) => {
        for (let item of element.genre) {
          if (item.name.includes(value)) {
            this.collection$.push(element);
          }
        }
      });
    } else {
      this.finsishArr();
    }
  }

  changeSelectedState(value) {
    if (!this.isSelected && value != '') {
      this.isSelected = true;
    } else {
      this.isSelected = false;
    }
  }
}
