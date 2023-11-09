<template>
  <div class="page">
    <div class="content">
    <SearchForm v-model="city"
                @showWeather="showWeather"
    />
      <div class="content_wrapper">
        <div class="screens_wrapper">
          <router-view :weather="weather"
                       @addLocation="addLocation"
                       :forecast="forecast"
          ></router-view>
          <Tabs/>
        </div>
        <div class="locations_wrapper">
          <div class="added-location">Added locations:</div>
          <LocationsList @showWeather="showWeather" :locations="locations" @deleteLocation="deleteLocation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import LocationsList from "@/components/LocationsList.vue";
import Tabs from "@/components/Tabs.vue";
import {getWeather, getForcast} from "@/utils/data";

export default {
  name: "WeatherApp",
  components: {Tabs, SearchForm, LocationsList},
  data() {
    return {
      defaultCity: "New York",
      city: null,
      weather: {
        currentLocation: null,
        temp: null,
        feels_like: null,
        description: null,
        sunrise: null,
        sunset: null,
        imageURL: null
      },
      forecast: [],
      locations: new Set([])
    }
  },
  methods: {
    addLocation() {
      const location = this.weather.currentLocation.toUpperCase();
      this.locations.add(location);
      localStorage.setItem(location, location);
    },
    deleteLocation(city) {
      localStorage.removeItem(city);
      this.locations.delete(city);
    },
    async showWeather(cityFromFavorite) {
      const cityToSearch = cityFromFavorite ? cityFromFavorite : this.city;
      if(cityToSearch.length) {
        const now = await getWeather(cityToSearch);
        const forecast = await getForcast(cityToSearch);
        if (now && forecast) {
          this.weather = {...now};
          this.forecast = forecast;
          this.clearSearch();
        } else if (now === false || forecast === false) {
          alert('Wrong city.')
        }
      }
    },
    clearSearch() {
      this.city = '';
    },
    renderLocationsFromStorage() {
      let keys = Object.keys(localStorage);
      for(let key of keys) {
        if(!key) {
          continue;
        }
        this.locations.add(localStorage.getItem(key));
      }
    },
    async renderDefaultWeather() {
      const now = await getWeather(this.defaultCity);
      const forecast = await getForcast(this.defaultCity);
      this.weather = {...now};
      this.forecast = forecast;
    }
  },
  mounted() {
    this.renderDefaultWeather();
    this.renderLocationsFromStorage();
    // this.locations.add(localStorage.getItem('1')) ;
  }
}
</script>

<style>
@import "./assets/css/global.css";
.page {
  width: 621px;
  height: 440px;
  background-color: #fff;
  padding: 10px;
}

.content {
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex-basis: 50%;
  border-right: solid 2px black;
}

.locations_wrapper {
  flex-basis: 50%;
}

.added-location {
  padding: 40px 15px 15px;
  border-bottom: solid 2px black;
}


.now_icon img {
  width: 120px;
  height: 120px;
}
</style>
