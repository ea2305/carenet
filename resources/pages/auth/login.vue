<template lang="pug">
  .column.is-12
    .columns.is-multiline.is-mobile.is-centered.vpage.image-background.is-marginless
      .column.is-8-desktop.is-8-mobile.is-flex.flex-center
        
        // Card body
        .card.has-background-white.full-width.p-2
          .card-media
            .is-flex.flex-center.mt-2
              //- img(src='/logos/blue_icon.svg' width="300")

          form.card-content(@submit.prevent="validateBeforeSubmit")

            b-field(
              custom-class="has-text-primary"
              label='Correo'
              :type="{'is-danger': errors.has('email')}"
              :message="errors.first('email')"
            )
              b-input(
                v-model="email"
                name="email"
                type='email'
                v-validate="'required|email'"
                maxlength='200'
                has-counter
              )

            b-field(
              custom-class="has-text-primary"
              label='Contraseña'
              :type="{'is-danger': errors.has('password')}"
              :message="errors.first('password')"
            )
              b-input(
                v-model="password"
                name="password"
                type='password'
                v-validate="'required'"
                password-reveal
                maxlength='200'
                has-counter
              )

            // recaptcha validation
            //- client-only
              vue-recaptcha.is-flex.flex-center(
                v-if='request_captcha'
                @verify='onVerify', 
                @expired='onExpired', 
                sitekey='6Lfjd6EUAAAAAN6PiCkyRxsS12ZXbG2Mc_yI594u'
              )

            .is-flex.flex-start
              nuxt-link.is-size-6.has-text-info(
                to='/auth/reset-password'
              ) Recuperar contraseña

            .is-flex.flex-end.mt-2
              button.is-medium.button.is-pink.pl-2.pr-2 Ingresar
</template>

<script>
export default {
  layout: 'auth',
  head: {
    script: [
      // { src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit", async: true, defer: true }
    ]
  },
  components: {
    // VueRecaptcha
  },
  data () {
    return {
      email: '',
      password: '',
      // captcha: '',
      // request_captcha: false
    }
  },
  mounted () {
    timer = setTimeout(() => {
      this.moveToDashboard()
    }, 1000)
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  methods: {
    moveToDashboard() {
      this.$router.push('/panel')
    },
    /**
     * Función de inicio de sesión
     */
    async login () {
      const _ = this
      const data = {
        email: this.email,
        password: this.password,
        // captcha: this.captcha
      }

      try {
        const response = await this.$auth.loginWith('local', { data })
        this.$buefy.toast.open({
          message: 'Bienvenido',
          type: 'is-success',
          position: 'is-bottom'
        })
        console.log('Auth success')
        if(this.$auth.user.rol === 'admin') {
          this.$router.push('/panel/perfil')
        } else {
          this.$router.push('/panel')
        }
      } catch (error) {
        console.log(error)
        if (error.response.data.requirement) {
          this.request_captcha = true
        }
        this.$router.push('/auth/login') 
      }
    },
    /**
     * Validación de campos en formulario
     */
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.login()
          return
        }
        this.$buefy.toast.open({
          message: 'Campos incorrectos, verifique los valores e intente nuevamente.',
          type: 'is-danger',
          position: 'is-bottom'
        })
      });
    },
    // /**
    //  * Captcha fue ferificada
    //  * @param {String} response : Respueta de GRecaptcha
    //  */
    // onVerify (response) {
		// 	this.captcha = response
    // },
    // // Captcha ha expirado
		// onExpired () {
    //   this.$snackbar.open({ message: 'La validación de captcha ha expirado', type: 'is-warning' })
    // }, 
    // // Captcha se ha ejecutado
		// onSubmit () {
		// 	this.$refs.invisibleRecaptcha.execute()
    // },
    // // Captcha se ha reiniciado
		// resetRecaptcha () {
		// 	// this.$refs.recaptcha.reset() // Direct call reset method
		// }
  }
}
</script>

<style lang="sass">
.full-width
  width: 100%
</style>