const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  teacherId: state => state.user.teacherId,
  name: state => state.user.name,
  buttons: state => state.user.buttons,
  roles: state => state.user.roles,
  nickName: state => state.user.nickName,
  routes: state => state.permission.routes,
  addRoutes: state => state.permission.addRoutes
}
export default getters
