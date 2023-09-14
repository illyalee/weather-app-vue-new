<template>
  <div class="weather_wrapper">
    <div class="weather">
      <SearchInput :city="city"
                  @update:modelValue="newValue => city = newValue"
                  @getWeather="getWeather"
      />
      <div class="content_wrapper">
        <div class="screens_wrapper">
          <div class="now_screen">
            <div class="now_temperature">{{weather.temp}}</div>
            <div class="now_icon">
              <img :src='this.weather.imageURL' alt="weather icon">
            </div>
            <div class="now_current-location">
              <div>{{this.currentLocation}}</div>
              <button @click="addNewLocation" class="now_add-current-location_btn">+</button>
            </div>
          </div>
        </div>
        <div class="locations_wrapper">
          <div class="added-location">Added locations:</div>
          <div class="locations">
            <LocationItem :name="location.name" v-for="location in favoriteLocations" :key="location.name" @deleteLocation="deleteLocation(location.name)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from "@/components/SearchInput.vue";
import LocationItem from "@/components/Location.vue";
export default {
  components: {SearchInput, LocationItem},
  data() {
    return {
      city: 'New York',
      currentLocation: '',
      weather: {
        temp: null,
        feels_like: null,
        description: null,
        sunrise: null,
        sunset: null,
        imageURL: ''
      },
      favoriteLocations: [
        {name: 'Moscov'},
        {name: 'Bali'},
        {name: 'London'}
      ]
    }
  },
  methods: {
  async getWeather() {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${this.city}&appid=${apiKey}&units=metric`;
    const f = await fetch(url);
    const data = await f.json();
    console.log(data)

    if (data.cod !== 200) {
    alert('city not found')
      this.city = ''
      return;
    }
      this.currentLocation = this.city;
      this.weather.temp = Math.round(data.main.temp) + ' °C';
      this.weather.feels_like = Math.round(data.main.feels_like) + ' °C';
      this.weather.description = data.weather[0].description;
      this.weather.sunrise = data.sys.sunrise;
      this.weather.sunset = data.sys.sunset;
      this.weather.imageURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      this.city = ''
    },
    addNewLocation() {
      let isCityInFavoriteList = this.favoriteLocations.find((city) => this.currentLocation === city.name)
      if (!isCityInFavoriteList && this.currentLocation.length) {
      this.favoriteLocations.push({name: this.currentLocation})
    }
    },
    deleteLocation(city) {
      this.favoriteLocations = this.favoriteLocations.filter((c) => city !== c.name)
    }
  }
}



</script>

<style>
@import "./assets/css/global.css";

  .weather_wrapper {
    width: 620px;
    height: 440px;
    background-color: #fff;
    padding: 10px;
  }
  .weather {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    border: solid 2px black;
    box-sizing: border-box;
  }
  .content_wrapper {
    display: flex;
    flex-basis: 100%;
    flex-grow: 1;

  }
  .screens_wrapper {
    height: 100%;
    flex-basis: 50%;
    border-right: solid 2px black;
  }
  .locations_wrapper {
    flex-basis: 50%;
  }
  .now_temperature {
    font-size: 38px;
  }
  .added-location {
    padding: 40px 15px 15px;
    border-bottom: solid 2px black;
  }
  .locations {
    padding: 15px;
  }
  .now_icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .now_icon img {
    width: 120px;
    height: 120px;
  }
  .now_screen {
    height: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .now_current-location {
    display: flex;
    justify-content: space-between;
  }
  </style>
