import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeView2 from '../views/HomeView2.vue'
import LoginView from '../views/LogIn.vue'
import AuthCallback from '../views/AuthCallback.vue'
import ConfirmEmail from '../views/ConfirmEmail.vue'
import ForgotEmail from '../views/ForgotEmail.vue'
import PasswordReset from '../views/PasswordReset.vue'
import SignUpView from '../views/SignUp.vue'
import AdsListView from '@/views/AdsList.vue'
import CategoryView from '../views/Admin/CategoryView.vue'
import CategoryListView from '../views/CategoryList.vue'
import RolesView from '@/views/Admin/RolesView.vue'
import UsersView from '@/views/Admin/UsersView.vue'
import AdShowView from '@/views/AdShow.vue'
import NotifView from '@/views/NotifView.vue'
import UserShowView from '@/views/UserShow.vue'
import AdsDeptmtView from '@/views/AdsDeptmt.vue'
import DashBoard from '@/views/DashBoard.vue'
import ChatAssistant from '@/views/ChatAssistant.vue'
import AdEdit from '@/views/AdEdit.vue'
import ProfileEdit from '@/views/ProfileEdit.vue'
import PricingView from '@/views/PricingView.vue'
import SearchResults from '@/views/SearchResults.vue'
// import CategoryShowView from '@/views/CategoryShow.vue'
import AdcreateView from '@/views/AdcreateView.vue'
import MyadsView from '@/views/MyadsView.vue'
import {useUserRoles} from '../components/composables/userRoleApi'
import UnauthorizedView from '../views/UnauthorizedView.vue'
import AdminDashBord from '../views/Admin/AdminDashBord.vue'
import ProdList from '@/views/ProdList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/prod',
      name: 'prod',
      component: ProdList,
    },
    {
      path: '/guest',
      name: 'guest',
      component: HomeView2,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: "/auth/callback",
      name: "AuthCallback",
      component: AuthCallback,
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: ConfirmEmail

    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatAssistant

    },
    {
      path: '/forgot',
      name: 'forgot',
      component: ForgotEmail

    },
    {
      path: '/reset',
      name: 'reset',
      component: PasswordReset

    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/admin/category',
      name: 'category',
      component: CategoryView,
      meta: { requiresAuth: true, requiredRole: 'Admin' }

    },
    {
      path: '/notif',
      name: 'notif',
      component: NotifView,
      meta: { requiresAuth: true, requiredRole: 'Admin' }

    },
    {
      path: '/categoryList',
      name: 'categoryList',
      component: CategoryListView,
      meta: { requiresAuth: false }

    },
    {
      path: '/adCreate',
      name: 'adCreate',
      component: AdcreateView,
      meta: { requiresAuth: true }
    },
    {
      path: '/myAds',
      name: 'myAds',
      component: MyadsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: PricingView,
    },
    {
      path: '/profileEdit',
      name: 'profileEdit',
      component: ProfileEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
      meta: { requiresAuth: true }
    },
    {
      path: '/adsList',
      name: 'adsList',
      component: AdsListView
    },
    {
      path: '/search-results',
      name: 'searchResults',
      component: SearchResults
    },
    {
      path: '/admin/roles',
      name: 'roles',
      component: RolesView,
      meta: { requiresAuth: true, requiredRole: 'Admin' }
    },
    {
      path: '/admin/users',
      name: 'users',
      component: UsersView,
      meta: { requiresAuth: true, requiredRole: 'Admin' }
    },
    {
      path: '/ad/:id',
      name: 'adShow',
      component: AdShowView
    },
    {
      path: '/users/:user',
      name: 'userShow',
      component: UserShowView
    },
    {
      path: '/annonces/:department',
      name: 'adDeptmt',
      component: AdsDeptmtView
    },
    {
      path: '/edit/:id',
      name: 'adEdit',
      component: AdEdit
    },
    {
      path: '/categories/:id',
      name: 'categoryShow',
      component: () => import(/* webpackChunkName: "CategoryShow" */ '../views/CategoryShow.vue'),
      props: true
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: UnauthorizedView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashBord
    },
  ]
})

// console.log(statusData);

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  // Assurez-vous que vous avez le rôle de l'utilisateur avant de passer à la navigation
  const { userRole, getUserRole } = useUserRoles(); // Obtenez les fonctions getUserRole et userRole
  await getUserRole(); // Obtenez le rôle de l'utilisateur
  const userRoleValue = userRole.value; // Obtenez la valeur du rôle de l'utilisateur
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  } else if (to.meta.requiredRole && userRoleValue !== to.meta.requiredRole) {
    next('/unauthorized'); // Rediriger vers une page non autorisée si l'utilisateur n'a pas le rôle requis
  } else {
    next(); // Autoriser la navigation
  }
});

export default router
