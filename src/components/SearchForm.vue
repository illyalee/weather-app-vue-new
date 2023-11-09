<script>
import SearchImgItem from "@/components/SearchImgItem.vue";

export default {
  name: "SearchForm",
  components: {SearchImgItem},
  props: {
    modelValue: String
  },
  emits: ['update:modelValue', 'showWeather'],
  computed: {
    cityValue: {
      get() {
        return this.modelValue
      },
      set(cityValue) {
        this.$emit('update:modelValue', cityValue)
      }
    }
  }
}
</script>

<template>
  <form @submit.prevent class="search_wrapper">
    <input v-model="cityValue" class="input" type="text" placeholder="Search City"/>
    <button class="button" @click="$emit('showWeather')">
      <SearchImgItem/>
    </button>
  </form>
</template>

<style>
.search_wrapper {
  height: 45px;
  display: flex;
  border-bottom: solid 2px black;
}

.input {
  box-sizing: border-box;
  display: block;
  height: 100%;
  flex-basis: 90%;
  padding: 0px 20px;
}

.button {
  height: 100%;
  flex-basis: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button:hover {
  background-color: #f2f1f1;
}
</style>