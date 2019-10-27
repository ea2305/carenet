<template lang="pug">
  main
    Title(title="Registrar paciente")

    .column.is-12-desktop.is-12-mobile
      .columns.is-multiline.is-mobile.is-centered
        .column.is-9-desktop.is-12-mobile
          form( @submit.prevent="validateBeforeSubmit" ref='form')
            b-field( label="Nombre Completo" :type="{'is-danger': errors.has('form.name')}" :message="errors.first('form.name')" )
              b-input( v-model="form.name" name="form.name" v-validate="'required|max:500'" maxlength="254")

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

            b-field( label="Cama" :type="{'is-danger': errors.has('form.bed')}" :message="errors.first('form.bed')" )
              b-input( v-model="form.bed" name="form.bed" v-validate="'required|max:500'" )

            button.button.has-background-success.has-text-white.is-pulled-right.mb-4.pl-2.pr-2( type="submit" ) Actualizar paciente

          br/
          nuxt-link.button.is-info.is-fullwidth(:to="`/panel/patients/${$route.params.id}/registries`") Información de registro de paciente
          br/
          nuxt-link.button.is-white.is-fullwidth(:to="`/panel/registries/${$route.params.id}`") QR Client
          br/
          b-input( name="token" :value="token")
          a.button.is-info.is-fullwidth(:href="`mailto:?subject=Invitación Paciente&body=El código de acceso es${token}`" target="_blank") Enviar correo



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
    store.commit('users/setPerPage', 100)
    store.commit('users/setRole', 'doctor')
    await store.dispatch('users/list')

    // Get info one patient
    await store.dispatch('patients/show', route.params.id)
    await store.dispatch('users/show', store.state.patients.entity.doctor_id)

    return {
      form: {
        name: store.state.patients.entity.name,
        doctor: {
          username: store.state.users.entity.username,
          id: store.state.patients.entity.id
        },
        bed: store.state.patients.entity.bed
      }
    }
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
  mounted () {
    this.doctor = this.form.doctor.username
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
					this.UpdatePatient()
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
    async UpdatePatient(){
      const form = {
        name: this.form.name,
        doctor_id: this.doctorSelected.id != this.form.doctor.id ? this.doctorSelected.id : this.form.doctor.id,
				bed: this.form.bed
      }
      console.log(form)
			// Crea nuevo usuario en store
			await this.$store.dispatch('patients/update', { form, index: this.$route.params.id })
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
    },
    token () {
      return this.$store.state.patients.entity.guest.token
    }
  }
}
</script>
