<template lang="pug">
  b-navbar
    template(slot='brand')
      b-navbar-item(tag='router-link', :to="{ path: '/' }")
        img(src='/icon.png', alt='Care net app')

    template(slot='start')
      b-navbar-dropdown(label='Usuarios')
        b-navbar-item(href='#') Creación
        b-navbar-item(href='#') Consulta
      b-navbar-dropdown(label='Pacientes')
        b-navbar-item(href='#') Consulta

    template(slot='end')
      b-navbar-item(tag='div')
        .buttons
          a.button.is-light Logout

</template>