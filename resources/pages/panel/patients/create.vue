<template lang="pug">
  main
    Title(title="Registrar paciente")
    p Create

    .column.is-12-desktop.is-11-mobile
      // - Seleccionar Doctor
      b-field(
        label="Selecciona un doctor *" 
        :type="{'is-danger': errors.has('doctor')}"
        :message="errors.first('doctor')"
        maxlength="500"
      )
        b-autocomplete(
          :data="doctors"
          v-model="doctor"
          name="doctor"
          v-validate="'required'"
          placeholder="Selecciona un doctor"
          :open-on-focus="true"
          field="username"
          @select="option => doctorSelected = option"
        )
</template>

<script>
import Title from '~/components/Layout/Title'
export default {
  layout: 'auth',
  middleware: 'auth',
  components: {
    Title
  },
  async asyncData ({ store }) {
		store.dispatch('users/list')
	},
  data: () => ({
    // Select filter autocomplete,
    doctor: '',
    doctorSelected: null,
  }),
  computed: {
    doctors () {
      return this.$store.state.users.collection.data.filter(doctor => {
        // Validations
        let admin = this.$auth.user.rol

        if (admin === 'admin') {
          return doctor.username.toString().toLowerCase().indexOf(this.doctor.toLowerCase()) >= 0
        }
      })
    }
  }
}
</script>