<template>
  <div class="page">
    <div class="content">
    <SearchForm v-model="city"
                @showWeather="showWeather"
    />
      <div class="content_wrapper">
        <div class="screens_wrapper">
          <router-view :weather="weather" @addLocation="addLocation" ></router-view>
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
import {getWeather} from "@/utils/data";

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
      locations: new Set([])
    }
  },
  methods: {
    addLocation() {
      this.locations.add(this.weather.currentLocation.toUpperCase())
    },
    deleteLocation(city) {
      this.locations.delete(city)
    },
    async showWeather() {
      if(this.city.length) {
        const data = await getWeather(this.city)
        if (data) {
          this.weather = {...data};
          this.clearSearch();
        } else if (data === false) {
          alert('Wrong city.')
        }
      }
    },
    clearSearch() {
      this.city = '';
    },
    async getDefaultCity() {
      const data = await getWeather(this.defaultCity);
      this.weather = {...data};
    }
  },
  mounted() {
    this.getDefaultCity();
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
