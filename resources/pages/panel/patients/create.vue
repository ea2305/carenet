<template lang="pug">
  main
    Title(title="Registrar paciente")
    p Create

    .column.is-12-desktop.is-12-mobile
      .columns.is-multiline.is-mobile.is-centered
        .column.is-9-desktop.is-12-mobile
          form( @submit.prevent="validateBeforeSubmit" ref='form')
            b-field( label="Nombre Completo" :type="{'is-danger': errors.has('name')}" :message="errors.first('name')" )
              b-input( v-model="name" name="name" v-validate="'required|max:500'" maxlength="254")

            // - Seleccionar Doctor
            b-field( label="Selecciona un doctor" :type="{'is-danger': errors.has('doctor')}" :message="errors.first('doctor')" )
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

            b-field( label="Cama" :type="{'is-danger': errors.has('bed')}" :message="errors.first('bed')" )
              b-input( v-model="bed" name="bed" v-validate="'required|max:500'" )

            button.button.has-background-pink.has-text-white.is-pulled-right.mb-4.pl-2.pr-2( type="submit" ) Crear paciente

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
    name: null,
    bed: null,
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
    },
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.AddNewPatient()
					this.$buefy.toast.open({
						message: 'Formulario enviado.',
						type: 'is-success',
						position: 'is-bottom'
					})

					return;
				}
				this.$buefy.toast.open({
					message: 'El formulario no es valido! Por favor verifica los campos.',
					type: 'is-danger',
					position: 'is-bottom'
				})
      })
    },
    async AddNewPatient(){
      const form = {
        name: this.name,
        doctor_id: this.doctorSelected.id,
				bed: this.bed
      }
			// Crea nuevo usuario en store
			await this.$store.dispatch('patients/create', form)
			this.$router.push("/panel/patients")
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
