const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker,i,data) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    rol: data.rol
  }
})

Factory.blueprint('App/Models/Patient', async (faker,i,data) => {
    return {
      name: faker.username(),
      bed :"bed ("+data.guest_id+")", 
      doctor_id:data.doctor_id,
      guest_id:data.guest_id
    }
  })