const loginEvent = (type, user) => {
  document.dispatchEvent(new CustomEvent('login', { detail: { type: type, body: user }}))
}

const logoutEvent = () => {
  document.dispatchEvent(new CustomEvent('logout', {}))
}

const userUpdateEvent = (user) => {
  document.dispatchEvent(new CustomEvent('userUpdate', {detail: { body: user }}));
}

const loadingEvent = (isLoading) => {
  document.dispatchEvent(new CustomEvent('loading', {detail: {body: { loading: isLoading }}}));
}

const events = {
  loginEvent,
  logoutEvent,
  userUpdateEvent,
  loadingEvent
}

export default events;
