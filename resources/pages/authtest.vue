<template lang="pug">
  section
    button(@click="login") Login bro
</template>

<script>
export default {
  layout: 'auth',
  methods: {
    async login () {
      const data = { email: 'sikcac@kori.gp', password: '1234567890'}
      await this.$auth.loginWith('local', { data })
    }
  }
}
</script>