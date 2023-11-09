<script>

export default {
  name: "Forecast",
  props: {
    forecast: {type: Array, required: true}
  }
}
</script>

<template>
  <div class="forecast_wrapper">
    <div class="forecast" v-for="item in forecast">
      <div class="row">
        <div>{{item.day}}</div>
        <div>{{item.time}}</div>
      </div>
      <div class="row">
        <div>
          <p>Temperature: {{ item.temp }}</p>
          <p>Feel like: {{ item.feels_like }}</p>
        </div>
        <div>
          <p>{{ item.description }}</p>
          <div class="icon">
            <img :src='item.imageURL' alt="weather icon">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .forecast_wrapper{
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    height: 351px;
    font-size: 18px;
  }
  .forecast {
    border: solid 1px black;
    margin-bottom: 15px;
    padding: 5px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon img {
    height: 60px;
  }
</style>