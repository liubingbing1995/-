export default (view) => () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
export function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
