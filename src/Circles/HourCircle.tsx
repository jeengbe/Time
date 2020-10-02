import Circle, { CircleProps, CircleState } from "../Circle";

export interface HourCircleProps extends CircleProps {}

export interface HourCircleState extends CircleState {}

class HourCircle extends Circle<HourCircleProps, HourCircleState> {
  constructor(props: HourCircleProps) {
    super(props);

    for (let i = 0; i < 60; i+=5) {
      this.ticks.push(i);
    }

    this.state = {
      status: "This hour has passed by",
      fraction: 0,
    };
  }

  tick() {
    this.setState(_ => {
      let date = new Date();

      let total = 1000 * 60 * 60;
      let current = 0;
      current += date.getMinutes() * 1000 * 60;
      current += date.getSeconds() * 1000;
      current += date.getMilliseconds();

      return {
        fraction: current / total,
      };
    });
  }
}

export default HourCircle;
