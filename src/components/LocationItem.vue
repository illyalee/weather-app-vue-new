<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  emits: ['deleteLocationByName'],
  name: "LocationItem",

}
</script>

<template>
  <div class="favorites">
    <div class="location">{{ name }}</div>
    <button class="delete" @click="$emit('deleteLocationByName', name)">delete</button>
  </div>
</template>

<style scoped>
.favorites {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.delete {
  border: solid 1px red;
  border-radius: 5px;
}

.delete:hover {
  background-color: #ffe8e8;
}
</style>