import Circle, { CircleProps, CircleState } from "../Circle";

export interface SecondCircleProps extends CircleProps {}

export interface SecondCircleState extends CircleState {}

class SecondCircle extends Circle<SecondCircleProps, SecondCircleState> {
  constructor(props: SecondCircleProps) {
    super(props);

    for (let i = 0; i < 1000; i += 100) {
      this.ticks.push(i);
    }

    this.state = {
      status: "This second has passed by",
      fraction: 0,
    };

    this.config.interval = 5;
  }

  tick() {
    this.setState(_ => {
      let date = new Date();

      let total = 1000;
      let current = 0;
      current += date.getMilliseconds();

      return {
        fraction: current / total,
      };
    });
  }
}

export default SecondCircle;
