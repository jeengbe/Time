import Circle, { CircleProps, CircleState } from "../Circle";

export interface MinuteCircleProps extends CircleProps {}

export interface MinuteCircleState extends CircleState {}

class MinuteCircle extends Circle<MinuteCircleProps, MinuteCircleState> {
  constructor(props: MinuteCircleProps) {
    super(props);

    for (let i = 0; i < 60; i+=5) {
      this.ticks.push(i);
    }

    this.state = {
      status: "This minute has passed by",
      fraction: 0,
    };

    this.config.interval = 5;
  }

  tick() {
    this.setState(_ => {
      let date = new Date();

      let total = 1000 * 60;
      let current = 0;
      current += date.getSeconds() * 1000;
      current += date.getMilliseconds();

      return {
        fraction: current / total,
      };
    });
  }
}

export default MinuteCircle;
