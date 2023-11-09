<script>
export default {
  props: {
    weather: {type: Object, required: true}
  },
  name: "Details"
}
</script>

<template>
  <div class="details_screen">
    <h2>{{ weather.currentLocation }}</h2>
    <p>Temperature: {{ weather.temp }}</p>
    <p>Feel like: {{ weather.feels_like }}</p>
    <p>Description: {{ weather.description }}</p>
    <p>Sunrise: {{ weather.sunrise }}</p>
    <p>Sunset: {{ weather.sunset }}</p>
    </div>
</template>

<style scoped>

.details_screen {
  padding: 10px;
  flex: 1;
  box-sizing: border-box;
}

h2 {
  margin-bottom: 7px;}

p {
  margin-bottom: 5px;
}
</style>