<script>
export default {
  props: {
    weather: Object
  },
  emits: ['addLocation'],
  name: "CurrentLocation"
}
</script>

<template>
  <div class="now_screen">
    <div class="now_temperature">{{ weather.temp }}</div>
    <div class="now_icon">
      <img :src='weather.imageURL' alt="weather icon">
    </div>
    <div class="now_current-location">
      <div>{{ weather.currentLocation }}</div>
      <button @click="$emit('addLocation')" class="now_add-current-location_btn">+</button>
    </div>
  </div>
</template>

<style scoped>

.now_temperature {
  font-size: 38px;
}


.now_icon {
  display: flex;
  justify-content: center;
  align-items: center;
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