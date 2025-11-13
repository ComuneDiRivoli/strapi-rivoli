module.exports = {
  async beforeCreate(event) {
    const { data } = event.params
    if (data.name && data.surname) {
      data.fullname = `${data.name} ${data.surname}`
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params
    if (data.name && data.surname) {
      data.fullname = `${data.name} ${data.surname}`
    }
  },
}
