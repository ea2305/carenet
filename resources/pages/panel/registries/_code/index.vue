<template lang="pug">
  main
    Title(:title="`Paciente QR - ${$route.params.code}`" subtitle="")

    .columns.is-multiline.is-mobile.is-centered

      //- Content
      .column.is-11-desktop.is-11-mobile.is-flex.flex-center.flex-valign.flex-column.mt-2

        qrcode(:value="$route.params.code" :options="{ width: 400 }")

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
