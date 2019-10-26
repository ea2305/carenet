<template lang="pug">
  main
    Title(title="Actualizar información de personal" subtitle="Complete los campos")
    .columns.is-multiline.is-mobile.is-centered
      .column.is-11-mobile.is-11-desktop

        form(@submit.prevent="update")
          b-field(label='Nombre de usuario')
            b-input(v-model='form.username', maxlength='250' required)

          b-field(label='Correo electrónico')
            b-input(v-model='form.email', maxlength='250' type="email" required)

          b-field(label='Rol de usuario')
            b-select(:value="form.rol" placeholder='Selecciona un rol valido')
              option(value='') Seleccione una opción
              option(v-for='option in options', :value='option.value', :key='option.value') {{ option.name }}

          br/
          button.button.is-success.is-medium Actualizar

        br/
        form(@submit.prevent="updatePassword")

          b-field(label='Contraseña')
            b-input(v-model='auth.password', maxlength='250' type="password" password-reveal required)

          b-field(label='Confirmar contraseña')
            b-input(v-model='auth.confirmation', maxlength='250' type="password" password-reveal required)

          br/
          button.button.is-warning.is-medium Actualizar contraseña


</template>

<script>
import Title from '~/components/Layout/Title'
export default {
  layout: 'auth',
  components: {
    Title
  },
  async asyncData ({ store, route }) {
    store.dispatch('users/show', route.params.id)
    return {
      form: {
        username: store.entity.username,
        email: store.entity.email,
        rol: store.entity.rol
      }
    }
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        rol: ''
      },
      auth: {
        password: '',
        confirmation: '',
      },
      options: [
        { value: 'admin', name: 'Administrador' },
        { value: 'doctor', name: 'Doctor' },
        { value: 'nurse', name: 'Enfermero(a)' }
      ]
    }
  },
  methods: {
    async updatePassword () {
      if (this.auth.password === '' || this.auth.confirmation === '') {
        this.$buefy.toast.open({ message: 'Contraseña obligatoria', type: 'is-danger', position: 'is-top' })
        return
      }
      if (this.auth.password !== this.auth.confirmation) {
        this.$buefy.toast.open({ message: 'Los contraseñas no coinciden', type: 'is-danger', position: 'is-top' })
        return
      }

      // process
      const form = { ...this.auth }
      await this.$store.dispatch('users/updatePassword', form)
      this.$buefy.toast.open({ message: 'Datos actualizados correctamente', type: 'is-success', position: 'is-top' })
    },
    async update() {
      // process
      const form = { ...this.form }
      await this.$store.dispatch('users/updated', form)
      this.$buefy.toast.open({ message: 'Datos actualizados correctamente', type: 'is-success', position: 'is-top' })
    }
  }
}
</script>