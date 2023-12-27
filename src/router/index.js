import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import authRole from "../middlewares/authRole";

Vue.use(VueRouter);

const routes = [
   //DOLAR HOY
   {
    path: "/manifest/dolarBlue",
    name: "dolarBlue",
    meta: {
      title: "Valor dolar hoy",
      requiresAuth: true,
      requiresRole: [1, 2]
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/dolarBlue.vue"),
    props: true,
  },
  
  {
    path: "/manifest/flyersList",
    name: "flyersList",
    meta: {
      title: "Listado",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/flyersList.vue"),
    props: true,
  },
  {
    path: "/totalFlyer",
    name: "totalFlyer",
    meta: {
      title: "Total",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/totalFlyer.vue"),
    props: true,
  },
  {
    path: "/manifest/registerFlyer",
    name: "registerFlyer",
    meta: {
      title: "Usuarios",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/registerFlyer.vue"),
    props: true,
  },
  {
    path: "/tandasMain",
    name: "tandasMain",
    meta: {
      title: "Controlador de Tandas",
      requiresAuth: true,
      //requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/tandasMain.vue"),
    props: true,
  },
  {
    path: "/manifest/tableTdms",
    name: "tablaTdms",
    meta: {
      title: "Agenda de TDMS",
      requiresAuth: true,
      //requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/tableTandems.vue"),
    props: true,
  },
  // EQUIPOS

  {
    path: "/manifest/equipmentList",
    name: "equipmentList",
    meta: {
      title: "Listado de Equipos",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/equipmentList.vue"),
    props: true,
  },
  {
    path: "/manifest/equipmentForm",
    name: "equipmentForm",
    meta: {
      title: "formulario Equipos",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/equipmentForm.vue"),
    props: true,
  },
  // AVIONES

  {
    path: "/manifest/planesList",
    name: "planesList",
    meta: {
      title: "Aviones",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/planesList.vue"),
    props: true,
  },
  {
    path: "/manifest/planesForm",
    name: "planesForm",
    meta: {
      title: "formulario Avión",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/planesForm.vue"),
    props: true,
  },

  // PRECIOS
  {
    path: "/manifest/pricesList",
    name: "pricesList",
    meta: {
      title: "Precios",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/pricesList.vue"),
    props: true,
  },
  {
    path: "/manifest/pricesForm",
    name: "pricesForm",
    meta: {
      title: "formulario Precios",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/pricesForm.vue"),
    props: true,
  },
  //TANDASSSS
  {
    path: "/manifest/tandasForm",
    name: "tandasForm",
    meta: {
      title: "Formulario Tanda",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/tandasForm.vue"),
    props: true,
  },
  {
    path: "/NewPassenger",
    name: "NewPassenger",
    meta: {
      title: "Pasajero TDM",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/NewPassengerForm.vue"),
    props: true,
  },
  {
    path: "/totalAff",
    name: "totalAff",
    meta: {
      title: "total AFF",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2, 4]),
    component: () => import("../views/aff/totalAff.vue"),
    props: true,
  },
  {
    path: "/flyersTotal",
    name: "flyersTotal",
    meta: {
      title: "Total",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2]),
    component: () => import("../views/manifest/flyersTotal.vue"),
    props: true,
  },

  //CERVEZAAAA
  {
    path: "/beer",
    name: "beer",
    meta: {
      title: "Gestión de deudores",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2, 3, 4, 6]), // VIP, MANIFEST, AFF INST TDM Y PACKERS
    component: () => import("../views/beers/beers.vue"),
    props: true,
  },
  {
    path: '/DebtorDetails/:id',
    name: 'DebtorDetails',
    meta: {
      title: "Detalles de deudor",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2, 4, 6]),
    component: () => import("../views/beers/DebtorDetails.vue"),
    props: true,
  },
  //tabla packers
  {
    path: "/tablepackers",
    name: "tablepackers",
    meta: {
      title: "Plegados",
      requiresAuth: true,
    },
    beforeEnter: authRole([1, 2, 6]), // vip, manifiesto y packers
    component: () => import("../views/packers/tablePackers.vue"),
    props: true,
  },
  {
    path: "/total",
    name: "packersGraphic",
    meta: {
      title: "Totales",
      requiresAuth: true,
    },
    beforeEnter: authRole([ 1, 2 ]), // vip y manifiesto
    component: () => import("../views/modelViews/total.vue"),
    props: true,
  },
  {
    path: "/totalPilots",
    name: "totalPilots",
    meta: {
      title: "Total Pilotos",
      requiresAuth: true,
    },
    beforeEnter: authRole([ 1, 2 , 7 ]), // vip, manifiesto y pilotos
    component: () => import("../views/pilots/totalPilots.vue"),
    props: true,
  },
  {
    path: "/totalTdmInstructors",
    name: "totalTdmInstructors",
    meta: {
      title: "Total Instructores TDM",
      requiresAuth: true,
    },
    beforeEnter: authRole([ 1, 2 , 3 ]), // vip, manifiesto e instructores tdm
    component: () => import("../views/instructors/totalTdmInstructors.vue"),
    props: true,
  },
  {
    path: "/weight",
    name: "weight",
    meta: {
      title: "Calcular peso",
      requiresAuth: true,
    },
    beforeEnter: authRole([ 1, 2, 3, 4, 5, 6, 7 ]), // vip, manifiesto, instructores tdm, aff, coach, packers, pilotos
    component: () => import("../views/manifest/weight.vue"),
    props: true,
  },
  {
    path: "/tableScreen",
    name: "tableScreen",
    meta: {
      title: "tableScreen",
      requiresAuth: true,
      hiddeHeadAndFooter: true, // Esto ocultará el header y el footer
    },
    beforeEnter: authRole([ 1, 2, 3, 4, 5, 6, 7 ]), // vip, manifiesto, instructores tdm, aff, coach, packers, pilotos
    component: () => import("../views/manifest/TableScreen.vue"),
    props: true,
  },

  
  {
    path: "/",
    redirect: { name: "dashboard" },
  },
  //AUTHENTICACION
  {
    path: "/login",
    name: "Login",
    meta:{
      hiddeHeadAndFooter: true
    },
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta:{
      hiddeHeadAndFooter: true
    },
    component: () => import("../views/auth/Register.vue"),
  },

  // APP
  {
    path: "/home",
    name: "dashboard",
    meta: {
      title: "Home",
      requiresAuth: true,
    },
    component: () => import("../views/Dashboard.vue"),
    props: true,
  },

  // MANIFIESTO
 
  // INSTRUCTORES
  {
    path: "/manifest/instructorsList",
    name: "instructorsList",
    meta: {
      title: "Listado de Instructores",
      requiresAuth: true,
    },
    component: () => import("../views/manifest/instructorsList.vue"),
    props: true,
  },
  {
    path: "/manifest/instructorsForm",
    name: "instructorsForm",
    meta: {
      title: "formulario Instructores",
      requiresAuth: true,
    },
    component: () => import("../views/manifest/instructorsForm.vue"),
    props: true,
  },
    // PACKERS

  {
    path: "/manifest/packersList",
    name: "packersList",
    meta: {
      title: "Listado de Packers",
      requiresAuth: true,
    },
    component: () => import("../views/manifest/packersList.vue"),
    props: true,
  },
  {
    path: "/manifest/packersForm",
    name: "packersForm",
    meta: {
      title: "formulario Packers",
      requiresAuth: true,
    },
    component: () => import("../views/manifest/packersForm.vue"),
    props: true,
  },
    // PILOTOS

  {
    path: "/manifest/pilotsList",
    name: "pilotsList",
    meta: {
      title: "Listulario pilotos",
      requiresAuth: true,
    },
    component: () => import("../views/manifest/pilotsList.vue"),
    props: true,
  },
  {
    path: "/manifest/pilotsForm",
    name: "pilotsForm",
    meta: {
      title: "formulario pilotos",
      requiresAuth: true,
    },
    component: () => import("../views/manifest/pilotsForm.vue"),
    props: true,
  },
  /*
  {
    path: "/exit",
    name: "exit",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/beers/exitRegister.vue"),
    props: true,
  },
  */
 /*
  {
    path: "/reader",
    name: "reader",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/beers/reader.vue"),
    props: true,
  },
  */

];

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  routes,
});

/*
router.beforeEach(async (to, from, next) => {
  if (to.matched.length > 0) {
    console.log("1")
    if (to.name === 'Login' && store.getters.isLoggedIn) {
      console.log("2")
      next('/home');
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
      console.log("3")
      if (store.getters.isLoggedIn) {
        console.log("4")
        if (to.matched.some(record => record.meta.requiresRole)) {
          console.log("5")
          console.log("to.matched", to.matched)
          const requiredRoles = to.matched
            .filter(record => record.meta.requiresRole)
            .map(record => record.meta.requiresRole);

            //const userRoles = store.getters.userRoles;
            const userRoles = store.getters.userRoles.map(role => String(role)); // Convierte los roles a cadenas
            console.log("6")
            console.log("userRoles", userRoles)

          console.log("requiredRoles", requiredRoles)
          // Verifica si el usuario tiene al menos uno de los roles requeridos (1 o 2)
          //const hasRequiredRole = requiredRoles.some(requiredRole => userRoles.includes(requiredRole));
          const hasRequiredRole = requiredRoles.some(requiredRole => userRoles.includes(String(requiredRole)));
          console.log("hasRequiredRole", hasRequiredRole)
          if (hasRequiredRole) {
            next();
          } else {
            next('/dashboard'); // Redirigir a la página de acceso no autorizado si no se cumple el rol
          }
        } else {
          next();
        }
      } else {
        next('/login');
      }
    } else {
      next();
    }
  } else {
    next('/login');
  }
});
 FUNCION ORIGINAL*/

 router.beforeEach(async(to, from, next) => {
  //valida si la route existe
    if (to.matched.length > 0) {//si existe
      if(to.name == 'Login' && store.getters.isLoggedIn){
        next('/home')
      }
      //verifica si la route requiere login

      if(to.matched.some(record => record.meta.requiresAuth)) {//si requiere login
        if (store.getters.isLoggedIn) {
          next()
          return
        } else {
          next('/login')
          //next()
        }
        //next("/login");
      } else {//sino requiere login
        next()
      }

    } else {//sino existe
      next("/login");
    }
});

export default router;