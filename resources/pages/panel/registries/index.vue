<template lang="pug">
  main
    Title(title="Listado de pacientes" subtitle="")

    .columns.is-multiline.is-mobile.is-centered

      //- Content elevator pitch
      .column.is-11-desktop.is-11-mobile.mt-2

        qrcode-stream(@decode='onDecode', @init='onInit')

        form(@submit.prevent="send")
          b-field(label='Clave de paciente' :type="{'is-danger': errors.has('id')}" :message="errors.first('id')")
            b-input(v-model='id', name='id', maxlength='50' v-validate="'required|max:50'" required)

          button.button.is-success.is-large.is-fullwidth Ingresar
</template>

<script>
import Title from '~/components/Layout/Title'
import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  layout: 'auth',
  middleware: 'auth',
	components: {
    Title,
    QrcodeStream
  },
  data () {
    return {
      id: ''
    }
  },
  methods: {
    send () {
      this.$router.push(`/panel/patients/${this.id}/registries`)
    },
    onDecode (id) {
      this.id = id
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>
