import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Format, Section } from '../shared/listItems.json';
import { MovieService } from '../shared/movie.service';
import { Router } from '@angular/router';

import { slidInAnimationLeft, slidInAnimationRight } from '../shared/animation';
import { BreakpointService } from '../shared/breakpoint.service';
import { SideNavService } from '../shared/sideNav.service';
import { newMovieService } from '../shared/newMovie.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss'],
  providers: [newMovieService],
  animations: [slidInAnimationLeft, slidInAnimationRight],
})
export class AddNewItemComponent implements OnInit {
  isMobile: boolean;
  isTablet: boolean;
  currentScreenWidth: string;
  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private router: Router,
    private newMovie: newMovieService,
    private bPs: BreakpointService,
    private sns: SideNavService
  ) {}
  responseFromApi: any[];
  responseCheck: boolean = false;
  newSelectedObject: any = [];
  addNewForm: FormGroup;
  searchNewMovie: FormGroup;
  imgPath: string;

  Categories;
  Formats;
  Note: boolean = false;
  ngOnInit(): void {
    this.sns.setValueSearchIcon(false);
    this.searchNewMovie = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
    });

    this.addNewForm = this.fb.group({
      buyDate: ['', Validators.required],
      format: ['', Validators.required],
      remarks: [''],
    });
    this.bPs.getSize().subscribe((value) => {
      this.currentScreenWidth = value;
      this.checkScreenWidth(value);
    });

    this.Formats = Format;
    this.Categories = Section;
  }
  checkScreenWidth(value?) {
    if (this.currentScreenWidth == 'Medium') {
      this.isTablet = true;
    }

    if (
      this.currentScreenWidth == 'XSmall' ||
      this.currentScreenWidth == 'Small'
    ) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  onSearch() {
    this.newMovie.fetchID(this.searchNewMovie.value).subscribe((data) => {
      this.responseFromApi = data['results'];
      this.responseCheck = true;
    });
  }
  onCreatenewDbObject(ItemID) {
    this.responseCheck = false;
    this.newMovie
      .fetchSelectedObject(ItemID, this.searchNewMovie.value)
      .subscribe((data) => {
        this.newSelectedObject = data;
      });
  }

  onSubmit() {
    this.movieService
      .saveMovie(this.addNewForm.value, this.newSelectedObject)
      .subscribe(
        (data) => {
          console.log('successfully saved', data);
          this.Note = true;
          setTimeout(() => {
            this.Note = false;
            this.router.navigate(['/home']);
          }, 1500);
        },
        (error) => console.log(error)
      );
  }
  resetForm() {
    this.addNewForm.reset();
    this.searchNewMovie.reset();
  }
}
