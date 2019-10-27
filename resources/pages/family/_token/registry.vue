<template lang="pug">
  main
    Title(title="Reporte de paciente" subtitle="")

    .columns.is-multiline.is-mobile.is-centered

      //- Content
      .column.is-11-desktop.is-11-mobile.is-flex.flex-center.flex-valign.flex-column.mt-2

        p.title.has-text-centered(v-if="reports.length === 0") El paciente aun no cuenta con registros

        section(v-for="(report, index) of reports" :key="`rpr-${index}`")
          br/
          .card.notification.full-width
            .card-content
              .media
                .media-left
                  figure.image.is-48x48
                    img(:src="(report.type === 'request') ? '/icons/request.png' : '/icons/report.png'", alt='Report and request icon')
                .media-content
                  p.title.is-4 {{ report.nurse.username }}
                  p.subtitle.is-6 {{ (report.type === 'request') ? 'Solicitud' : 'Reporte' }}
              .content {{ report.description }}
                hr/
                p.has-text-weight-bold.is-size-6 {{ $moment(report.created_at).format('DD MMM YYYY HH:mm') }}
            .card-action




</template>

<script>
import Title from '~/components/Layout/Title'

export default {
  layout: 'auth',
  middleware: 'auth',
	components: {
    Title
  },
  async asyncData ({ store, route }) {
    await store.dispatch('registries/listWithToken', { token: route.params.token })
  },

  computed: {
    reports () {
      console.log(this.$store.state.registries)
      return ''
      return this.$store.state.registries.collection.reports.data.map(e => ({
        id: e.id,
        doctor: e.doctor,
        nurse: e.nurse,
        type: e.type,
        description: e.description,
        created_at: e.created_at
      }))
    }
  }
}
</script>

<style lang="sass" scoped>
.full-width
  width: 90vw !important
</style>