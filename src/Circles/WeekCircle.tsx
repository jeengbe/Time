import Circle, { CircleProps, CircleState } from "../Circle";

export interface WeekCircleProps extends CircleProps {}

export interface WeekCircleState extends CircleState {}

class WeekCircle extends Circle<WeekCircleProps, WeekCircleState> {
  constructor(props: WeekCircleProps) {
    super(props);
    this.state = {
      status: "This week has passed by",
      fraction: 0,
    };

    this.config.sizes.ticks = 6;
    // this.ticks = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    this.ticks = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];
  }

  tick() {
    this.setState(_ => {
      let date = new Date();
      let day = date.getDay()-1;
      if(day < 0) {
        day+=7;
      }

      let total = 60 * 60 * 24 * 7;
      let current = 0;
      current += day * 60 * 60 * 24;
      current += date.getHours() * 60 * 60;
      current += date.getMinutes() * 60;
      current += date.getSeconds();

      return {
        fraction: current / total,
      };
    });
  }
}

export default WeekCircle;
