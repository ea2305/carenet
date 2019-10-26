<template lang="pug">
  main
    Title(title="Inicio" :subtitle="`Hola, ${username} bienvenido de nuevo.`")
</template>

<script>
import Title from '~/components/Layout/Title'
export default {
  layout: 'auth',
  components: {
    Title
  },
  computed: {
    username () {
      return this.$auth.user.username
    }
  }
}
</script>