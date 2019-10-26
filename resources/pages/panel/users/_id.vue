<template lang="pug">
  main
    .columns.is-multiline.is-mobile.is-centered

      .column.is-12-desktop.is-12-mobile

        Title(title="Actualizar información de personal" subtitle="Complete los campos")

        .columns.is-multiline.is-mobile.is-centered.mt-2
          .column.is-11-mobile.is-11-desktop

            form(@submit.prevent="update")
              b-field(label='Nombre de usuario' :type="{'is-danger': errors.has('form.username')}" :message="errors.first('form.username')")
                b-input(v-model='form.username', name='form.username', maxlength='250' v-validate="'required|max:250'" required)

              b-field(label='Correo electrónico' :type="{'is-danger': errors.has('form.email')}" :message="errors.first('form.email')")
                b-input(v-model='form.email', name='form.email', maxlength='250' type="email" v-validate="'email|required'" required)

              b-field(label='Rol de usuario' :type="{'is-danger': errors.has('form.rol')}" :message="errors.first('form.rol')")
                b-select(v-model="form.rol" name="form.rol" placeholder='Selecciona un rol valido' v-validate="'required'")
                  option(value='') Seleccione una opción
                  option(v-for='option in options', :value='option.value', :key='option.value') {{ option.name }}

              br/
              button.button.is-success.is-medium Actualizar

            br/
            form(@submit.prevent="updatePassword")

              b-field(label='Contraseña' :type="{'is-danger': errors.has('form.password')}" :message="errors.first('form.password')")
                b-input(v-model='form.password', name='form.password', maxlength='250' type="password" v-validate="{ required: true, is: form.confirmation }" password-reveal required)

              b-field(label='Confirmar contraseña' :type="{'is-danger': errors.has('form.confirmation')}" :message="errors.first('form.confirmation')")
                b-input(v-model='form.confirmation', name='form.confirmation', maxlength='250' type="password" v-validate="'required'" password-reveal required)

              br/
              button.button.is-warning.is-medium Actualizar contraseña


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
    await store.dispatch('users/show', route.params.id)
    return {
      form: {
        username: store.state.users.entity.username,
        email: store.state.users.entity.email,
        rol: store.state.users.entity.rol
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

      if (this.auth.password !== this.auth.confirmation) {
        this.$buefy.toast.open({ message: 'Los contraseñas no coinciden', type: 'is-danger', position: 'is-top' })
        return
      }

      this.$validator.validateAll().then(async (result) => {
        if (result) {
          // process
          const form = { ...this.auth }
          await this.$store.dispatch('users/updatePassword', { form, index: this.$route.params.id })
          this.$buefy.toast.open({ message: 'Datos actualizados correctamente', type: 'is-success', position: 'is-top' })
          return
        }
        this.$buefy.toast.open({ message: 'Campos incorrectos, verifique los valores e intente nuevamente.', type: 'is-danger', position: 'is-top'})
      })
    },

    async update() {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          // process
          // process
          const form = { ...this.form }
          await this.$store.dispatch('users/update', { form, index: this.$route.params.id })
          this.$buefy.toast.open({ message: 'Datos actualizados correctamente', type: 'is-success', position: 'is-top' })
          return
        }
        this.$buefy.toast.open({ message: 'Campos incorrectos, verifique los valores e intente nuevamente.', type: 'is-danger', position: 'is-top'})
      })
    }
  }
}
</script>