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
    this.daysInYear = (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) ? 366 : 365;

    this.config.sizes.ticks = 6;
    this.ticks = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]
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
}

export default YearCircle;
