<template lang="pug">
  main
    Title(title="Reporte de paciente" subtitle="")

    .columns.is-multiline.is-mobile.is-centered
      .column.is-11-desktop.is-11-mobile.is-flex.flex-center.flex-valign.flex-column.mt-2
        nuxt-link.button.is-success.is-medium.is-pulled-right(
          :to="`/panel/patients/${$route.params.id}/registries/create`"
        ) Crear Reporte

      //- Content
      .column.is-11-desktop.is-11-mobile.is-flex.flex-center.flex-valign.flex-column.mt-2
        section(v-for="(report, index) of reports" :key="`rpr-${index}`")
          br/
          .card
            .card-content
              .media
                .media-left
                  figure.image.is-48x48
                    img(:src="(report.type === 'solicitud') ? '/icons/request.png' : '/icons/report.png'", alt='Report and request icon')
                .media-content
                  p.title.is-4 {{ report.nurse.username }}
                  p.subtitle.is-6 {{ (report.type === 'solicitud') ? 'Solicitud' : 'Reporte' }}
              .content {{ report.description }}
                hr/
                p.has-text-weight-bold.is-size-6 {{ $moment(report.created_at).format('DD MMM YYYY HH:mm') }}




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
    await store.dispatch('registries/list', { patient_id: route.params.id })
  },
  computed: {
    reports () {
      return this.$store.state.registries.collection
    }
  }
}
</script>
