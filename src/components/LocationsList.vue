<script>
import LocationItem from "@/components/LocationItem.vue";

export default {
  name: "LocationsList",
  components: {LocationItem},
  props: {
    locations: {
      type: Array,
      required: true
    },
  },
  emits: ['deleteLocation'],
  methods: {
    deleteLocationByName(name) {
      this.$emit('deleteLocation', name)
    }
  }
}
</script>

<template>
  <div class="locations">
    <LocationItem :name="location.name" v-for="location in locations" :key="location.name"
                  @deleteLocationByName="deleteLocationByName"/>
  </div>
</template>

<style scoped>
.locations {
  padding: 15px;
}
</style>