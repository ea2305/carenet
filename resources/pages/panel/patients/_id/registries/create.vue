<template lang="pug">
  main
    Title(title="Creación de registro")
    .columns.is-multiline.is-mobile.is-centered

      //- Content
      .column.is-11-desktop.is-11-mobile.mt-2

        p.is-size-5.has-text-weight-bold.has-text-right Reporte para día:
        p.is-size-5.has-text-right {{ $moment().format('DD MM YYYY - HH:mm') }}

        form(@submit.prevent="sendForm")
          b-field(label='Tipo de reporte' :type="{'is-danger': errors.has('form.type')}" :message="errors.first('form.type')")
            b-select(v-model="form.type" name="form.type" placeholder='Selecciona un tipo valido' v-validate="'required'")
              option(value='') Seleccione una opción
              option(v-for='type in types', :value='type.value', :key='type.value') {{ type.name }}

          b-field(label='Descripción' :type="{'is-danger': errors.has('form.description')}" :message="errors.first('form.description')")
            b-input(type="textarea" v-model='form.description', name='form.description', maxlength='750' v-validate="'required|max:750|min:10'" required)

          button.button.is-large.is-rounded.is-fullwidth(@click.prevent="audio")
            span.icon.is-small
              i.fas.fa-podcast
            span Grabar audio


          br/
          button.button.is-success.is-medium.is-pulled-right.is-fullwidth Procesar registro



</template>

<script>
import Title from '~/components/Layout/Title'
export default {
  layout: 'auth',
  components: {
    Title
  },
  async asyncData({ store, route }) {
    await store.dispatch('patients/show', route.params.id)
  },
  data () {
    return {
      form: {
        type: '',
        description: ''
      },
      types: [
        { value: 'report', name: 'Reporte' },
        { value: 'request', name: 'Solicitud' },
      ]
    }
  },
  methods: {
    audio () {
      // audio function here
    },
  async sendForm () {
      let form = { ...this.form }
      form.patient_id = this.$store.state.patients.entity.id
      form.doctor_id = this.$store.state.patients.entity.doctor_id
      form.nurse_id = this.$auth.user.id

      await this.$store.dispatch('registries/create', { form, patient_id: this.$route.params.id })
      this.$router.go(-1)
    }
  }
}
</script>