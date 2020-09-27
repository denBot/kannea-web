<template>
  <div class="homepage">
    <div class="parallax" />

    <div href="#" class="homepage-section">
      <div class="top-container">
        <h1 class="quicksand-font title">Kannea</h1>
        <p class="quicksand-font description">Some descriptive text...</p>
        <div class="links">
          <a
            href="/gallery"
            target="_blank"
            rel="noopener noreferrer"
            class="button--grey"
          >
            Gallery
          </a>

          <a
            href="/posts"
            target="_blank"
            rel="noopener noreferrer"
            class="button--grey"
          >
            Posts
          </a>

          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            class="button--grey"
          >
            About
          </a>
        </div>
      </div>
    </div>

    <div href="#about" class="homepage-section">
      <h1 class="quicksand-font title">About</h1>
    </div>

    <div href="#contact" class="homepage-section homepage-contact">
      <h1 class="quicksand-font title">Contact</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({})
</script>

<style lang="scss" scoped>
.homepage {
  .homepage-section {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    text-align: center;
    height: 100vh;

    .title {
      display: block;
      font-weight: 300;
      font-size: 6rem;
      color: #35495e;
      letter-spacing: 1px;
    }

    .description {
      display: block;
      font-weight: 300;
      font-size: 1.5rem;
      color: #535353;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    .links {
      padding-top: 15px;
    }
  }

  .top-container {
    align-items: center;
    padding-top: 3vh;
  }

  .homepage-contact {
    height: 82vh;
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
}
</style>
