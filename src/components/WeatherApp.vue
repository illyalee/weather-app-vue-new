<script>
import SearchForm from "@/components/SearchForm.vue";
import CurrentLocation from "@/components/CurrentLocation.vue";
import LocationsList from "@/components/LocationsList.vue";
import {getWeather} from "@/utils/data";

export default {
  name: "WeatherApp",
  components: {LocationsList, CurrentLocation, SearchForm},
  data() {
    return {
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
      locations: [
        {name: 'Moscow'},
        {name: 'Bali'},
        {name: 'London'}
      ]
    }
  },
  methods: {
    addLocation() {
      const isCityInFavoriteList = this.locations.find((city) => this.weather.currentLocation.toLowerCase() === city.name.toLowerCase());
      if (!isCityInFavoriteList) {
        this.locations.push({name: this.weather.currentLocation})
      }
    },
    deleteLocation(city) {
      this.locations = this.locations.filter((c) => city.toLowerCase() !== c.name.toLowerCase())
    },
    async showWeather() {
      const data = await getWeather(this.city)
      if (data) {
        this.weather = {...data};
        this.clearSearch()
      }
    },
    clearSearch() {
      this.city = ''
    }
  },
  async mounted() {
    const defaultCity = 'New York'
    const data = await getWeather(defaultCity)
    this.weather = {...data};
  }
}
</script>

<template>
  <div class="page">
    <div class="weather">
      <SearchForm v-model="city"
                  @showWeather="showWeather"
      />
      <div class="content_wrapper">
        <div class="screens_wrapper">
          <CurrentLocation :weather="weather" @addLocation="addLocation"/>
        </div>
        <div class="locations_wrapper">
          <div class="added-location">Added locations:</div>
          <LocationsList :locations="locations" @deleteLocation="deleteLocation"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.page {
  width: 621px;
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

.added-location {
  padding: 40px 15px 15px;
  border-bottom: solid 2px black;
}


.now_icon img {
  width: 120px;
  height: 120px;
}

</style>