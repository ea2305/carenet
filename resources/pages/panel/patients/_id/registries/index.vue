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
          .card.notification.full-width
            button.delete(@click.prevent="deleteElement(report.id)")
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
    await store.dispatch('registries/list', { patient_id: route.params.id })
  },
  methods: {
    deleteElement (id) {
      this.$store.dispatch('registries/delete', { patient_id: this.$route.params.id, index: id })
    }
  },
  computed: {
    reports () {
      return this.$store.state.registries.collection.map(e => ({
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