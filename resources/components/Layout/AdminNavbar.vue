<template lang="pug">
  b-navbar
    template(slot='brand')
      b-navbar-item(tag='router-link', :to="{ path: '/' }")
        img(src='/icon.png', alt='Care net app' width="150" height="150")

    template(v-if="loggedIn" slot='start')
      b-navbar-dropdown(label='Personal')
        nuxt-link.navbar-item(to='/panel/users/create') Creación
        nuxt-link.navbar-item(to='/panel/users') Consulta
      b-navbar-dropdown(label='Pacientes')
        nuxt-link.navbar-item(to='/panel/patients/create') Registro
        nuxt-link.navbar-item(to='/panel/patients') Consulta

      b-navbar-dropdown(label='Registros')
        nuxt-link.navbar-item(to='/panel/registries') Inicio


    template(slot='end')
      nuxt-link.navbar-item(v-if="!loggedIn" to='/auth/login') Iniciar sesión
      b-navbar-item(tag='div')
        .buttons(v-if="loggedIn" @click="logout")
          a.button.is-light Cerrar sesión

</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  },
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    }
  }
}
</script>