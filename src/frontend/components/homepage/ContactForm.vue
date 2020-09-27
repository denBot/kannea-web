<template>
  <div class="form-container">
    <div class="contact-form">
      <p>some text here</p>
      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Full name" />
          <span class="icon is-small is-left">
            <fa-icon :icon="['fa', 'user']" />
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-danger"
            type="email"
            placeholder="Email address"
          />
          <span class="icon is-small is-left">
            <fa-icon :icon="['fa', 'envelope']" />
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Enter your message here..." />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <div class="select">
            <select>
              <option>What is your reason for contacting?</option>
              <option>Option One</option>
              <option>Option Two</option>
              <option>Option Three</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
      <button class="button is-medium is-success">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.contact-form {
  width: 64vw;
  padding: 1.3rem;
  justify-content: left;
  text-align: left;
}
.form-container {
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>
