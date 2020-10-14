import Circle, { CircleProps, CircleState } from "../Circle";

export interface YearCircleProps extends CircleProps {}

export interface YearCircleState extends CircleState {}

class YearCircle extends Circle<YearCircleProps, YearCircleState> {
  protected daysInYear: number = 0;

  constructor(props: YearCircleProps) {
    super(props);
    this.state = {
      status: "This year has passed by",
      fraction: 0,
    };

    let year = new Date().getFullYear();
    this.daysInYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0) ? 366 : 365;

    this.config.sizes.ticks = 6;
    this.ticks = ["Jan.", "", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

    this.events = [
      {
        angle: this.date2Ang(new Date("16. Oct. 2020 9:35")),
        text: "Physik",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("23. Oct. 2020 11:20")),
        text: "Mathe",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("4. Dec. 2020 9:35")),
        text: "Physik",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("9. Nov. 2020 7:40")),
        text: "Informatik",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("16. Nov. 2020 9:35")),
        text: "Ethik",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("17. Nov. 2020 13:50")),
        text: "GMK",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("25. Nov. 2020 13:50")),
        text: "Geschichte",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("30. Nov. 2020 14:40")),
        text: "Kunst",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("4. Dec. 2020 9:35")),
        text: "Physik",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("8. Dec. 2020 9:35")),
        text: "Englisch",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("9. Dec. 2020 9:35")),
        text: "Mathe",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("21. Dec. 2020 7:40")),
        text: "Informatik",
        color: "#cacc",
      },
      {
        angle: this.date2Ang(new Date("22. Dec. 2020 7:40")),
        text: "Chemie",
        color: "#cacc",
      }
    ];

    this.spans = [
      {
        begin: this.date2Ang(new Date("24. Dec. 2019")),
        end: this.date2Ang(new Date("5. Jan 2020")),
        text: "Weihnachten",
        color: "#aacc",
      },
      {
        begin: this.date2Ang(new Date("13. Apr. 2020")),
        end: this.date2Ang(new Date("19. Apr 2020")),
        text: "Ostern",
        color: "#aacc",
      },
      {
        begin: this.date2Ang(new Date("28. May 2020")),
        end: this.date2Ang(new Date("14. Jun. 2020")),
        text: "Pfingsten",
        color: "#aacc",
      },
      {
        begin: this.date2Ang(new Date("30. Jul. 2020")),
        end: this.date2Ang(new Date("13. Sep. 2020")),
        text: "Sommer",
        color: "#aacc",
      },
      {
        begin: this.date2Ang(new Date("26. Oct. 2020")),
        end: this.date2Ang(new Date("1. Nov 2020")),
        text: "Pfingsten",
        color: "#aacc",
      },
      {
        begin: this.date2Ang(new Date("23. Dec. 2020")),
        end: this.date2Ang(new Date("10. Jan. 2021")),
        text: "Weihnachten",
        color: "#aacc",
      },
      {
        begin: this.date2Ang(new Date("19. Mar. 2020 19:45")),
        end: this.date2Ang(new Date("9. Jul. 2020 16:30")),
        text: "Evelyn",
        color: "#acac",
      },
      {
        begin: this.date2Ang(new Date("15. Mar. 2020")),
        end: this.date2Ang(new Date("14. Jun. 2020")),
        text: "Lockdown",
        color: "#caac",
      },
    ];

    this.labels = [
      {
        text: "Lockdown",
        color: "#caac",
        type: "line",
      },
      {
        text: "Evelyn",
        color: "#acac",
        type: "line",
      },
      {
        text: "Ferien",
        color: "#aacc",
        type: "line",
      },
      {
        text: "Klausuren",
        color: "#cacc",
        type: "dot",
      },
    ];
  }

  tick() {
    this.setState(_ => {
      let date = new Date();

      var now: any = new Date();
      var start: any = new Date(now.getFullYear(), 0, 0);
      var diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      var dayInYear = Math.floor(diff / oneDay);

      let total = 60 * 60 * 24 * this.daysInYear;
      let current = 0;
      current += dayInYear * 60 * 60 * 24;
      current += date.getHours() * 60 * 60;
      current += date.getMinutes() * 60;
      current += date.getSeconds();

      return {
        fraction: current / total,
      };
    });
  }
  date2Ang(date: Date): number {
    return ((date.getTime() - new Date(2020, 0, 0).getTime()) / 1000) * (360 / (60 * 60 * 24 * this.daysInYear));
  }
}

export default YearCircle;
