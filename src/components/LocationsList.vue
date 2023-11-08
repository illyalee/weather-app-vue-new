<script>
import LocationItem from "@/components/LocationItem.vue";

export default {
  name: "LocationsList",
  components: {LocationItem},
  props: {
    locations: {
      type: Set,
      required: true
    },
  },
  emits: ['deleteLocation', 'showWeather'],
  methods: {
    deleteLocationByName(name) {
      this.$emit('deleteLocation', name)
    },
    showWeatherByName(name) {
      this.$emit('showWeather', name)
    }
  }
}
</script>

<template>
  <div class="locations">
    <LocationItem @showWeatherByName="showWeatherByName(location)" :name="location" v-for="location in locations" :key="location"
                  @deleteLocationByName="deleteLocationByName(location)"/>
  </div>
</template>

<style scoped>
.locations {
  padding: 15px;
}
</style>