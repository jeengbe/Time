import React from 'react';
import ReactDOM from 'react-dom';
import SecondCircle from './Circles/SecondCircle';
import MinuteCircle from './Circles/MinuteCircle';
import HourCircle from './Circles/HourCircle';
import TodayCircle from './Circles/TodayCircle';
import WeekCircle from './Circles/WeekCircle';
import MonthCircle from './Circles/MonthCircle';
import YearCircle from './Circles/YearCircle';

ReactDOM.render(
  <React.StrictMode>
    <SecondCircle size="33%" />
    <MinuteCircle size="33%" />
    <HourCircle size="33%" />
    <TodayCircle size="33%" />
    <WeekCircle size="33%" />
    <MonthCircle size="33%" />
    <YearCircle size="33%" />
  </React.StrictMode>,
  document.getElementById("root")
);