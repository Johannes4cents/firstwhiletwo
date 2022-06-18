export default class Genre {
  constructor(name, id, image) {
    this.name = name;
    this.id = id;
    this.image = image;
  }

  toObj() {
    return {
      name: this.name,
      id: this.id,
      image: this.image,
    };
  }
}

const genres = [
  new Genre({ english: "Comedy", german: "Komödie" }, 1, "/icon_comedy.png"),
  new Genre(
    { english: "Thriller", german: "Thriller" },
    2,
    "/icon_thriller.png"
  ),
  new Genre({ english: "Crime", german: "Verbrechen" }, 3, "/icon_crime.png"),
  new Genre({ english: "Fantasy", german: "Fantasy" }, 4, "/icon_fantasy.png"),
  new Genre(
    { english: "Science-Fiction", german: "Science-Fiction" },
    5,
    "/icon_scifi.png"
  ),
  new Genre({ english: "Horror", german: "Horror" }, 6, "/icon_horror.png"),
  new Genre({ english: "Youth", german: "Jugend" }, 7, "/icon_youth.png"),
  new Genre(
    { english: "Real Life", german: "Echtes Leben" },
    8,
    "/icon_rl.png"
  ),
  new Genre(
    { english: "Editorial", german: "Editorial" },
    9,
    "/icon_editorial.png"
  ),
  new Genre({ english: "Report", german: "Bericht" }, 10, "/icon_report.png"),
  new Genre({ english: "Diary", german: "Tagebuch" }, 11, "/icon_diary.png"),
  new Genre(
    { english: "Adventure", german: "Abenteuer" },
    12,
    "/icon_adventure.png"
  ),
];

export { genres };
