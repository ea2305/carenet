<template lang="pug">
  main
    Title(title="Información" subtitle="Paciente")

    .columns.is-multiline.is-mobile.is-centered

      .column.is-11-desktop.is-11-mobile.mt-2
        .is-flex.flex-center
          img(src='/favicon.png', alt='Application logo', width='200')

      //- Content
      .column.is-11-desktop.is-11-mobile.mt-2
        form( @submit.prevent="send" ref='form')
          b-field( label="Clave" :type="{'is-danger': errors.has('token')}" :message="errors.first('token')" )
            b-input( v-model="token" name="token" v-validate="'required|max:500'" maxlength="254")

          button.button.is-success.is-fullwidth Ingresar

</template>

<script>
import Title from '~/components/Layout/Title'

export default {
	components: {
    Title
  },
  data () {
    return {
      token: ''
    }
  },
  methods: {
    send () {
      this.$router.push(`/family/${this.token}/registry`)
    }
  }
}
</script>