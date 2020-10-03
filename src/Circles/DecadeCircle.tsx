import Circle, { CircleProps, CircleState } from "../Circle";

export interface DecadeCircleProps extends CircleProps {}

export interface DecadeCircleState extends CircleState {}

class DecadeCircle extends Circle<DecadeCircleProps, DecadeCircleState> {
  protected daysInDecade: number = 0;

  constructor(props: DecadeCircleProps) {
    super(props);
    this.state = {
      status: "This decade has passed by",
      fraction: 0,
    };

    this.daysInDecade = 0;

    for (let i = 2020; i < 2030; i += 1) {
      this.daysInDecade += i % 400 === 0 || (i % 100 !== 0 && i % 4 === 0) ? 366 : 365;
      this.ticks.push(i);
    }
  }

  tick() {
    this.setState(_ => {
      let date = new Date();

      var now: any = new Date();
      var start: any = new Date(now.getFullYear(), 0, 0);
      var diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
      var oneDay = 1000 * 60 * 60 * 24;
      var dayInDecade = Math.floor(diff / oneDay);

      for (let i = 2020; i < now.getFullYear(); i++) {
        dayInDecade += i % 400 === 0 || (i % 100 !== 0 && i % 4 === 0) ? 366 : 365;
      }

      let total = 60 * 60 * 24 * this.daysInDecade;
      let current = 0;
      current += dayInDecade * 60 * 60 * 24;
      current += date.getHours() * 60 * 60;
      current += date.getMinutes() * 60;
      current += date.getSeconds();

      return {
        fraction: current / total,
      };
    });
  }
  date2Ang(date: Date): number {
    return ((date.getTime() - new Date(2020, 0, 0).getTime()) / 1000) * (360 / (60 * 60 * 24 * this.daysInDecade));
  }
}

export default DecadeCircle;
