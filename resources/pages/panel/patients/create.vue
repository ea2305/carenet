<template lang="pug">
  main
    Title(title="Registrar paciente")
    p Create
</template>

<script>
import Title from '~/components/Layout/Title'
export default {
  layout: 'auth',
  middleware: 'auth',
  components: {
    Title
  },
}
</script>