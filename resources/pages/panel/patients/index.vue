<template lang="pug">
  main
    Title(title="Listado de pacientes")
    p index
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