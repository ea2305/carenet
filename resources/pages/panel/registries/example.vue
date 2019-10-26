<template lang="pug">
  main
    Title(title="Cama: Ejemplo" subtitle="")

    .columns.is-multiline.is-mobile.is-centered

      //- Content
      .column.is-11-desktop.is-11-mobile.is-flex.flex-center.flex-valign.flex-column.mt-2

        qrcode(value="Hello, World!" :options="{ width: 400 }")

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
