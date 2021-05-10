const getters = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.user.token,
  info: state => state.user.info,
  name: state => state.user.info.userName
}
export default getters
