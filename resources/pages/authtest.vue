<template lang="pug">
  section
    button(@click="login") Login bro
</template>

<script>
export default {
  layout: 'auth',
  methods: {
    async login () {
      const data = { email: 'admin@gmail.com', password: 'admin'}
      await this.$auth.loginWith('local', { data })
    }
  }
}
</script>