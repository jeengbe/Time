import React from "react";

export interface CircleProps {
  size?: string;
}

export interface CircleState {
  status?: string;
  fraction: number;
}

class Circle<P extends CircleProps, S extends CircleState> extends React.Component<P, S> {
  public timer: number = 0;
  protected config = {
    interval: 0,
    sizes: {
      ticks: 8,
      status: 4,
      percentage: 8
    },
    radii: {
      circle: 5,
      dash: {
        short: 10,
        long: 48
      },
      ticks: 56.5
    }
  };

  // protected ticks: { angle: number; value: any }[] | string[] = [];
  protected ticks: any[] = [];

  componentDidMount() {
    this.tick();
    if(this.config.interval > 0) {
      this.timer = window.setInterval((_: any) => this.tick(), this.config.interval);
    } else {
      setTimeout(_ => this.timer = window.setInterval((_: any) => this.tick(), 1000), 1000 - new Date().getMilliseconds());
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {}

  render() {
    // Arrow
    let r = ((this.state.fraction * 360 + 90) * Math.PI) / 180;
    let x1 = 64 + this.config.radii.dash.short * Math.cos(r);
    let y1 = 64 + this.config.radii.dash.short * Math.sin(r);
    let x2 = 64 + this.config.radii.dash.long * Math.cos(r - Math.PI);
    let y2 = 64 + this.config.radii.dash.long * Math.sin(r - Math.PI);

    let ticks = this.ticks.map((e, i) => {
      if(typeof e != "object") {
        e = {angle: 360/this.ticks.length*i, value: e}
      }
      let a = ((e.angle - 90) * Math.PI) / 180;
      let x = 64 + this.config.radii.ticks * Math.cos(a);
      let y = 64 + this.config.radii.ticks * Math.sin(a);
      return (
        <text key={e.angle} textAnchor="middle" fontSize={this.config.sizes.ticks} alignmentBaseline="central" x={x} y={y}>
          {e.value}
        </text>
      );
    });

    return (
      <svg style={{ border: "1px solid #333333", float: "left" }} viewBox="0 0 128 128" width={this.props.size} height={this.props.size} xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r={this.config.radii.circle} fill="#333333" />
        {ticks}
        <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" stroke="#333333" strokeLinecap="round" />
        <text textAnchor="middle" fontSize={this.config.sizes.status} alignmentBaseline="central" x="64" y="42">
          {this.state.status}
        </text>
        <text textAnchor="middle" fontSize={this.config.sizes.percentage} alignmentBaseline="central" x="64" y="50">
          {Math.floor(this.state.fraction*100)}%
        </text>
      </svg>
    );
  }
}

export default Circle;
