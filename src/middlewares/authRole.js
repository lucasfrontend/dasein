import store from '../store';

export default function (requiredRoles) {
  return (to, from, next) => {
    const userRoles = store.getters.userRoles;

    // Verifica si el usuario tiene al menos uno de los roles requeridos
    const hasRequiredRole = requiredRoles.some(requiredRole => userRoles.includes(requiredRole));

    if (hasRequiredRole) {
      next();
    } else {
      store.dispatch("logout");
      next('/unauthorized'); // Redirige a la página de acceso no autorizado si no se cumple el rol
    }
  };
}