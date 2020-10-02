import Circle, { CircleProps, CircleState } from "../Circle";

export interface TodayCircleProps extends CircleProps {}

export interface TodayCircleState extends CircleState {}

class TodayCircle extends Circle<TodayCircleProps, TodayCircleState> {
  constructor(props: TodayCircleProps) {
    super(props);

    for (let i = 0; i < 24; i++) {
      this.ticks.push(i);
    }

    this.state = {
      status: "Today has passed by",
      fraction: 0,
    };
  }

  tick() {
    this.setState(_ => {
      let date = new Date();

      let total = 60 * 60 * 24;
      let current = 0;
      current += date.getHours() * 60 * 60;
      current += date.getMinutes() * 60;
      current += date.getSeconds();

      return {
        fraction: current / total,
      };
    });
  }
}

export default TodayCircle;
