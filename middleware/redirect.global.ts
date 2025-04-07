export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/childHome') {
    return navigateTo('/child-home', { replace: true });
  }
});
