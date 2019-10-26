<template lang="pug">
  b-navbar
    template(slot='brand')
      b-navbar-item(tag='router-link', :to="{ path: '/' }")
        img(src='/icon.png', alt='Care net app' width="150" height="150")

    template(slot='start')
      b-navbar-dropdown(label='Personal')
        nuxt-link.navbar-item(to='/panel/users/create') Creación
        nuxt-link.navbar-item(to='/panel/users') Consulta
      b-navbar-dropdown(label='Pacientes')
        nuxt-link.navbar-item(to='#') Consulta

    template(slot='end')
      b-navbar-item(tag='div')
        .buttons(@click="logout")
          a.button.is-light Logout

</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>