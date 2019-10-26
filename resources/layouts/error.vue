{{{{raw}}}}
<template>
  <section class="container">

    <div class="is-flex flex-center">
      <img src="/favicon.png" alt="Application logo" width="200"/>
    </div>

    <hr/>

    <h1 class="title has-text-centered">
      {{ error.statusCode }}
    </h1>
    <h2 class="info has-text-centered">
      {{ error.message }}
    </h2>

    <div class="is-flex flex-center">
      <nuxt-link class="button" to="/" v-if="error.statusCode === 404 || error.statusCode === 500">
        Volver a inicio
      </nuxt-link>
    </div>

  </section>
</template>
{{{{/raw}}}}
<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.title
{
  margin-top: 15px;
  font-size: 5em;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
}
.button
{
  margin-top: 50px;
}
</style>
