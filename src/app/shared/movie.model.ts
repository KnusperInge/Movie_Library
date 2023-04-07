export class Movie {
  constructor(
    public buyDate: string,
    public category: string,
    public description: string,
    public format: string,
    public genre: any,
    public img: string,
    public title: string,
    public id?: string,
    public episodes?: string,
    public seasons?: string,
    public year?: string,
    public lastEpisode?: string,
    public status?: string,
    public remarks?: string
  ) {}
}
