import Circle, { CircleProps, CircleState } from "../Circle";

export interface CenturyCircleProps extends CircleProps {}

export interface CenturyCircleState extends CircleState {}

class CenturyCircle extends Circle<CenturyCircleProps, CenturyCircleState> {
  protected daysInCentury: number = 0;

  constructor(props: CenturyCircleProps) {
    super(props);
    this.state = {
      status: "This century has passed by",
      fraction: 0,
    };

    this.daysInCentury = 0;

    for (let i = 2000; i < 2100; i += 1) {
      this.daysInCentury += i % 400 === 0 || (i % 100 !== 0 && i % 4 === 0) ? 366 : 365;
      if(i % 10 === 0)
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
      var dayInCentury = Math.floor(diff / oneDay);

      for(let i = 2000; i < now.getFullYear(); i++) {
        dayInCentury += i % 400 === 0 || (i % 100 !== 0 && i % 4 === 0) ? 366 : 365
      }

      let total = 60 * 60 * 24 * this.daysInCentury;
      let current = 0;
      current += dayInCentury * 60 * 60 * 24;
      current += date.getHours() * 60 * 60;
      current += date.getMinutes() * 60;
      current += date.getSeconds();

      return {
        fraction: current / total,
      };
    });
  }
  date2Ang(date: Date): number {
    return ((date.getTime() - new Date(2020, 0, 0).getTime()) / 1000) * (360 / (60 * 60 * 24 * this.daysInCentury));
  }
}

export default CenturyCircle;
