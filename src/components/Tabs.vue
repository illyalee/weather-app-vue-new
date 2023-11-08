<script>
export default {
  name: "Tabs"
}
</script>

<template>
  <div class="tabs">
    <router-link to="/">Now</router-link>
    <router-link to="/details">Details</router-link>
    <router-link to="/forecast">Forecast</router-link>
  </div>
</template>

<style scoped>
  a {
    display: block;
    width: 100%;
    padding: 5px 0px;
    color: inherit;
    text-decoration: inherit;
    border-right: solid 2px black;
    text-align: center;
  }

  a:last-child{
    border: none;
  }

  a:hover {
    background-color: #f2f1f1;
  }

  .tabs {
    display: flex;
    justify-content: space-between;
    border-top: solid 2px black;
  }
</style>