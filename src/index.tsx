import React from 'react';
import ReactDOM from 'react-dom';
import SecondCircle from './Circles/SecondCircle';
import MinuteCircle from './Circles/MinuteCircle';
import HourCircle from './Circles/HourCircle';
import TodayCircle from './Circles/TodayCircle';
import WeekCircle from './Circles/WeekCircle';
import MonthCircle from './Circles/MonthCircle';
import YearCircle from './Circles/YearCircle';
import DecadeCircle from './Circles/DecadeCircle';
import CenturyCircle from './Circles/CenturyCircle';

import "bootstrap/dist/css/bootstrap.css";

import "./style/main.scss";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <div className="row no-gutters">
        <SecondCircle />
        <MinuteCircle />
        <HourCircle />
        <TodayCircle />
        <WeekCircle />
        <MonthCircle />
        <YearCircle />
        <DecadeCircle />
        <CenturyCircle />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);