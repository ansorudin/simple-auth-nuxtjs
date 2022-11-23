export default function ({ store, redirect }) {
  if (!store.getters.isAuth) {
    return redirect('/login')
  }
}
