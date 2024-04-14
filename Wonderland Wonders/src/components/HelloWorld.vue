<script setup>

</script>

<template>
  <div class="password-input">
    <label for="password">
      Enter password
    </label>

    <!-- We'll add stuff to this input later -->
    <input
      type="password"
      id="password"
    >

    <button>
      Show password
    </button>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

  .password-input {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 8px;
    font-size: 16px;
  }

  input {
    margin-bottom: 12px;
    padding: 8px;
    font-size: 16px;
  }

  button {
    margin-bottom: 12px;
  }

  .requirements {
    font-weight: bold;
  }

  .is-success {
    color: #96CA2D;
  }

  .is-error {
    color: #BA3637;
  }
</style>
