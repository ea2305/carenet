<template>
  <section class="container">
    <button @click="login">
      login
    </button>
  </section>
</template>

<script>
export default {
  methods: {
    async login () {
      const data = { email: 'example@yopmail.com', password: 'here'}
      await this.$auth.loginWith('local', { data })
    }
  }
}
</script>