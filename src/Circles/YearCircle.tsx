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
    this.ticks = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

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
        begin: this.date2Ang(new Date("15. Mar. 2020")),
        end: this.date2Ang(new Date("14. Jun. 2020")),
        text: "Lockdown",
        color: "#caac",
      },
    ];

    this.labels = [
      {
        text: "Lockdown",
        color: "#caac"
      },
      // {
      //   text: "Evelyn",
      //   color: "#acac"
      // },
      {
        text: "Ferien",
        color: "#aacc"
      },
    ]
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
