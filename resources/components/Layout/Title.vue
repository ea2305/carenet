<template lang="pug">
  section.hero
    .hero-body
      .container
        h1.title.has-text-centered {{ title }}
        h2.subtitle.has-text-centered {{ subtitle }}

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