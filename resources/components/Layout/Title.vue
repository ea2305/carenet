<template lang="pug">
  section.hero
    .hero-body
      .container
        h1.title {{ title }}
        h2.subtitle {{ subtitle }}

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    }
  }
}
</script>