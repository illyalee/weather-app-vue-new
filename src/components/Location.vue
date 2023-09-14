<script>
export default {
  props: ['name'],
  emits: ['deleteLocation'],
  name: "LocationItem",

}
</script>

<template >
  <div class="favorites">
    <div class="location">{{name}}</div>
<!-- хз пока   -->
    <button @click="$emit('deleteLocation')">delete</button>
  </div>
</template>

<style>
  .favorites {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .location {
  }
</style>