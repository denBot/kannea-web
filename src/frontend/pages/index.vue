<template>
  <div class="container">
    <div>
      <h1 class="title">Kannea</h1>
      <div class="links">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          About me
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          Artwork
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
      BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
      sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .links {
    padding-top: 15px;
  }
}
</style>
