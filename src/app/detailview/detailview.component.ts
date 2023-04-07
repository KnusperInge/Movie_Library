import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../shared/movie.model';
import { BreakpointService } from '../shared/breakpoint.service';
import { SideNavService } from '../shared/sideNav.service';

@Component({
  selector: 'app-detailview',
  templateUrl: './detailview.component.html',
  styleUrls: ['./detailview.component.scss'],
})
export class DetailviewComponent implements OnInit {
  selectedMovie: Movie;
  movieCollection: Movie[];
  movieID: any;
  isMobile: boolean;
  currentScreenWidth: string;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private bPs: BreakpointService,
    private sns: SideNavService
  ) {}
  ngOnInit() {
    this.sns.setValueSearchIcon(false);
    this.getRouteID();
    this.bPs.getSize().subscribe((value) => {
      this.currentScreenWidth = value;
      this.checkScreenWidth(value);
    });
  }
  checkScreenWidth(value?) {
    if (this.currentScreenWidth == 'XSmall') {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  async getRouteID() {
    this.route.params.subscribe(async (params) => {
      this.movieID = await params['id'];
      this.movieService.getMovie(this.movieID).subscribe((data) => {
        this.selectedMovie = data;
        // console.log('Data:', this.selectedMovie);
        // console.log(this.movieID);
      });
    });

    // this.movieID = this.route.snapshot.params['id'];
    // this.movieService.getMovie(this.movieID).subscribe((data) => {
    //   this.selectedMovie =data;
    // });
  }
}
