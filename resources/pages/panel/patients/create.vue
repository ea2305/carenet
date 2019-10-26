<template lang="pug">
  main
    Title(title="Registrar paciente")
    p Create

    p {{ doctorSelected }}

    .column.is-12-desktop.is-11-mobile
      // - Seleccionar Doctor
      b-field(
        label="Selecciona un doctor *"
        :type="{'is-danger': errors.has('doctor')}"
        :message="errors.first('doctor')"
        maxlength="500"
      )
        b-autocomplete(
          v-model="doctor"
          :data="doctors"
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
    store.commit('users/setPerPage', 100)
    store.commit('users/setRole', 'doctor')
		await store.dispatch('users/list')
	},
  data: () => ({
    // Select filter autocomplete,
    doctor: '', // buscador
    doctorSelected: null, // seleccionado
  }),
  watch: {
    doctor: {
      handler: 'fetch'
    }
  },
  methods: {
    fetch () {
      this.$store.commit('users/setPerPage', 100)
      this.$store.commit('users/setRole', 'doctor')
      this.$store.commit('users/setPage', this.page)
      this.$store.commit('users/setSearch', this.doctor)
      this.$store.dispatch('users/list')
    }
  },
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