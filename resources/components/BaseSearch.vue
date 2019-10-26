<template lang="pug">
	.column.is-12-desktop.is-12-mobile
		b-field.is-pulled-right.pr-2
			b-input.column.is-9-desktop.is-9-mobile.is-paddingless( v-model='search' placeholder='Buscar...'  type='search'  icon='magnify' @keyup.enter.native="sendSearch" )
			p.column.is-12-desktop.is-12-mobile.is-paddingless.control
				button.button.has-background-blue.pr-2.pl-2( @click='sendSearch' ) Buscar

</template>

<script>
export default {
	props: {
    data:{
      type: Array,
      required: false
    }
  },
  data: () => ({ search: '', selected: null }),
  methods: {
    sendSearch () {
      // trigger search
      this.$emit('sendSearch', this.search)
    }
  }
}
</script>