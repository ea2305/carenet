<template lang="pug">
  main
    Title(title="Agregar personal" subtitle="Complete los campos")
    .columns.is-multiline.is-mobile.is-centered
      .column.is-11-mobile.is-11-desktop

        form(@submit.prevent="sendForm")
          b-field(label='Nombre de usuario')
            b-input(v-model='form.username', maxlength='250' required)

          b-field(label='Correo electrónico')
            b-input(v-model='form.email', maxlength='250' type="email" required)

          b-field(label='Contraseña')
            b-input(v-model='form.password', maxlength='250' type="password" password-reveal required)

          b-field(label='Confirmar contraseña')
            b-input(v-model='form.confirmation', maxlength='250' type="password" password-reveal required)

          b-field(label='Rol de usuario')
            b-select(:v-model="form.rol" placeholder='Selecciona un rol valido')
              option(value='') Seleccione una opción
              option(v-for='option in options', :value='option.value', :key='option.value') {{ option.name }}

          br/
          button.button.is-success.is-medium.is-pulled-right Crear


</template>

<script>
import Title from '~/components/Layout/Title'
export default {
  layout: 'auth',
  middleware: 'auth',
  components: {
    Title
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        confirmation: '',
        rol: ''
      },
      options: [
        { value: 'admin', name: 'Administrador' },
        { value: 'doctor', name: 'Doctor' },
        { value: 'nurse', name: 'Enfermero(a)' }
      ]
    }
  },
  methods: {
    async sendForm () {
      if (this.form.password === '' || this.form.confirmation === '') {
        this.$buefy.toast.open({ message: 'Contraseña obligatoria', type: 'is-danger', position: 'is-top' })
        return
      }
      if (this.form.password !== this.form.confirmation) {
        this.$buefy.toast.open({ message: 'Los contraseñas no coinciden', type: 'is-danger', position: 'is-top' })
        return
      }

      // process
      const form = { ...this.form }
      await this.$store.dispatch('users/create', form)

      // redirect
      this.$router.push("/panel/users")
    }
  }
}
</script>