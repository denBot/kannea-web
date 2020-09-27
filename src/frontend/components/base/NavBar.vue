<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="nav" class="navbar-menu">
        <div class="navbar-start" />

        <div class="navbar-end">
          <a href="https://facebook.com/" class="navbar-item">
            <fa-icon :icon="['fab', 'facebook']" />
          </a>

          <a href="https://twitter.com/" class="navbar-item">
            <fa-icon :icon="['fab', 'twitter']" />
          </a>

          <a href="https://discordapp.com/" class="navbar-item">
            <fa-icon :icon="['fab', 'discord']" />
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link"> Pages </a>

            <div ref="dropdown" class="navbar-dropdown is-right">
              <nuxt-link to="/about" class="navbar-item"> About </nuxt-link>
              <nuxt-link to="/blog" class="navbar-item"> Blog </nuxt-link>
              <nuxt-link to="/gallery" class="navbar-item"> Gallery </nuxt-link>

              <div class="navbar-divider" />

              <nuxt-link to="/#contact" class="navbar-item">
                Contact
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style>
@media screen and (min-width: 1025px) {
  .navbar-item.is-hoverable:hover .navbar-dropdown {
    display: block !important;
  }
  .navbar-item.is-hoverable:focus-within .navbar-dropdown {
    display: none;
  }
}
</style>
