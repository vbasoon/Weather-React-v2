import React from 'react'
import apiKeys from "./apiKeys";
import Clock from 'react-live-clock';
import Forcast from './forcast';
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from 'react-animated-weather';

const dateBuilder = (d) => {
   let months = [
      'січень',
      'лютий',
      'березень',
      'квітень',
      'травень',
      'червень',
      'липень',
      'серпень',
      'вересень',
      'жовтень',
      'листопад',
      'грудень'
   ];
   let days = [
      "Неділя",
      "Понеділок",
      "Вівторок",
      "Середа",
      "Четвер",
      "П'ятниця",
      "Субота"
   ];

   let day = days[d.getDay()];
   let date = d.getDate();
   let month = months[d.getMoth()];
   let year = d.getFullYear();

   return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
   color: "white",
   size: 112,
   animate: true,
};

class Weather extends React.Component {
   state = {
      lat: undefined,
      lon: undefined,
      errorMessage: undefined,
      temperatureC: undefined,
      temperatureF: undefined,
      city: undefined,
      humidity: undefined,
      description: undefined,
      icon: "CLEAR_DAY",
      sunrise: undefined,
      sunset: undefined,
      errorMsg: undefined,
   };

   componentDidMount() {
      if (navigator.geolocation) {
         this.getPosition()
            .then((position) => {
               this.getWeather(position.coords.latitude, position.coords.longitude);
            })
            .catch((err) => {
               this.getWeather(28.67, 77.22);
               alert(
                  "You have disabled location service."
               );
            });
      } else {
         alert("Geolocation not available");
      }

      this.timerID = setInterval(
         () => this.getWeather(this.state.lat, this.state.lon),
         600000
      );

   }
}

componentWillUnmount() {
   clearInterval(this.timerID);
}