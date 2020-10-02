import Circle, { CircleProps, CircleState } from "../Circle";

export interface MonthCircleProps extends CircleProps {}

export interface MonthCircleState extends CircleState {}

class MonthCircle extends Circle<MonthCircleProps, MonthCircleState> {
  protected daysInMonth: number = 0;

  constructor(props: MonthCircleProps) {
    super(props);
    this.state = {
      status: "This month has passed by",
      fraction: 0,
    };
    let date = new Date();
    this.daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    for (let i = 0; i < this.daysInMonth; i++) {
      this.ticks.push(i+1);
    }

    this.config.sizes.ticks = 6;
  }

  tick() {
    this.setState(_ => {
      let date = new Date();

      let total = 60 * 60 * 24 * this.daysInMonth;
      let current = 0;
      current += (date.getDate()-1) * 60 * 60 * 24;
      current += date.getHours() * 60 * 60;
      current += date.getMinutes() * 60;
      current += date.getSeconds();

      return {
        fraction: current / total,
      };
    });
  }
}

export default MonthCircle;
