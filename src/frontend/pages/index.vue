<template>
  <div>
    <div class="parallax" />
    <div class="container">
      <div class="page">
        <h1 class="title">Kannea</h1>
        <div class="links">
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            class="button--grey"
          >
            About
          </a>

          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            class="button--grey"
          >
            Artwork
          </a>

          <a
            href="/posts"
            target="_blank"
            rel="noopener noreferrer"
            class="button--grey"
          >
            Blog
          </a>
        </div>
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
  min-height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  //height: 2000px;

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

.parallax {
  background-image: url("https://cdn.wallpapersafari.com/55/87/TNKS3B.jpg");
  min-height: 400px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom: 1px solid #242424;
}
</style>
