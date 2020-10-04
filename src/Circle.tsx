import React from "react";

import "./style/circle.scss";

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
    sortSpans: false,
    sizes: {
      ticks: 8,
      status: 4,
      percentage: 8,
      events: 6,
      spans: 5,
      labels: 5,
    },
    radii: {
      circle: 5,
      dash: {
        short: 10,
        long: 48,
      },
      ticks: 56.5,
      events: 48,
      spans: 40,
    },
  };

  protected events: { angle: number; text: any; color?: string }[] = [];
  protected spans: { begin: number; end: number; text: any; color: string; layer?: any }[] = [];
  protected labels: { text: any; color: string }[] = [];

  // protected ticks: { angle: number; value: any }[] | string[] = [];
  protected ticks: any[] = [];

  componentDidMount() {
    this.tick();
    if (this.config.interval > 0) {
      this.timer = window.setInterval((_: any) => this.tick(), this.config.interval);
    } else {
      setTimeout(_ => (this.timer = window.setInterval((_: any) => this.tick(), 1000)), 1000 - new Date().getMilliseconds());
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
      if (typeof e != "object") {
        e = { angle: (360 / this.ticks.length) * i, value: e };
      }
      let a = ((e.angle - 90) * Math.PI) / 180;
      let x = 64 + this.config.radii.ticks * Math.cos(a);
      let y = 64 + this.config.radii.ticks * Math.sin(a);
      return (
        <text key={e.angle} textAnchor="middle" fontSize={this.config.sizes.ticks} fill="#333333" alignmentBaseline="central" x={x} y={y}>
          {e.value}
        </text>
      );
    });
    if(this.config.sortSpans) {
      this.spans = this.spans.sort((a, b) => (b.end-b.begin) - (a.end-a.begin));
    }
    let spans = this.spans.map((e, i) => {
      let r = this.config.radii.spans;

      e.begin = Math.max(0, e.begin);
      e.end = Math.min(360, e.end);

      if (!this.spans[i].layer) {
        this.spans[i].layer = this.spans[i].layer || 0;

        let o = (): boolean => {
          for (let ix = 0; ix < i; ix++) {
            if (liesIn(e, this.spans[ix]) || liesIn(this.spans[ix], e)) {
              return true;
            }
          }
          return false;
        };

        while (o()) {
          this.spans[i].layer++;
        }
      }

      r -= this.spans[i].layer * 5;

      let ba = ((e.begin - 90) * Math.PI) / 180;
      let bx = 64 + r * Math.cos(ba);
      let by = 64 + r * Math.sin(ba);
      let ea = ((e.end - 90) * Math.PI) / 180;
      let ex = 64 + r * Math.cos(ea);
      let ey = 64 + r * Math.sin(ea);

      let ta = ((e.begin + (e.end - e.begin) / 2 - 90) * Math.PI) / 180;
      let tx = 64 + r * 1.1 * Math.cos(ta);
      let ty = 64 + r * 1.1 * Math.sin(ta);
      let an = ta < Math.PI / 2 ? "start" : "end";

      return (
        <g className="span" key={bx + "" + by + "" + ex + "" + ey} fill={e.color}>
          {e.begin > 0 ? <circle cx={bx} cy={by} r="1.5" fill={e.color} /> : <></>}
          {e.end < 360 ? <circle cx={ex} cy={ey} r="1.5" fill={e.color} /> : <></>}
          <path fill="none" stroke={e.color} strokeWidth="0.75" strokeLinecap="round" d={`M ${bx} ${by} A ${r} ${r} 0 0 1 ${ex} ${ey}`} />
          <path fill="none" stroke="transparent" strokeWidth="9" strokeLinecap="round" d={`M ${bx} ${by} A ${r} ${r} 0 0 1 ${ex} ${ey}`} />
          <text x={tx} y={ty} fill="none" fontSize={this.config.sizes.spans} textAnchor={an} alignmentBaseline="central">
            {e.text}
          </text>
        </g>
      );
    });
    let events = this.events.map(e => {
      let a = ((e.angle - 90) * Math.PI) / 180;
      let x = 64 + this.config.radii.events * Math.cos(a);
      let y = 64 + this.config.radii.events * Math.sin(a);
      return (
        <text key={e.angle} textAnchor="middle" fontSize={this.config.sizes.events} fill={e.color || "#333333"} alignmentBaseline="central" x={x} y={y}>
          {e.text}
        </text>
      );
    });
    let labels = this.labels.map((e, i) => {
      return (
        <g key={e.text}>
          <line stroke={e.color} strokeLinecap="round" strokeWidth="0.75" x1="117" y1={5 + this.config.sizes.labels * i} x2="122" y2={5 + this.config.sizes.labels * i} />
          <circle cx="117" cy={5 + this.config.sizes.labels * i} r="1.5" fill={e.color} />
          <circle cx="122" cy={5 + this.config.sizes.labels * i} r="1.5" fill={e.color} />
          <text x="114" y={4.75 + this.config.sizes.labels * i} alignmentBaseline="central" textAnchor="end" fontSize={this.config.sizes.labels}>
            {e.text}
          </text>
        </g>
      );
    });

    return (
      <div className="col-md-4">
        <svg viewBox="0 0 128 128" width={this.props.size} height={this.props.size} xmlns="http://www.w3.org/2000/svg">
          {ticks}
          {events}
          {spans}
          {labels}
          <circle cx="64" cy="64" r={this.config.radii.circle} fill="#333333" />
          <circle cx={x1} cy={y1} r="1.2" fill="#333333" />
          <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" stroke="#333333" strokeLinecap="round" />
          <text textAnchor="middle" fontSize={this.config.sizes.status} fill="#333333" alignmentBaseline="central" x="64" y="42">
            {this.state.status}
          </text>
          <text textAnchor="middle" fontSize={this.config.sizes.percentage} fill="#333333" alignmentBaseline="central" x="64" y="50">
            {Math.floor(this.state.fraction * 100)
              .toString()
              .padStart(2, "0")}
            %
          </text>
          <line x1="64" y1="1" x2="64" y2={63 - this.config.radii.circle} stroke="#33333333" strokeWidth="0.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
}

function liesIn(e: any, s: any): boolean {
  return s.layer === e.layer && ((e.begin > s.begin && e.begin < s.end) || (e.end > s.begin && e.end < s.end));
}

export default Circle;
