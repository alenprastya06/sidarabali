import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Import komponen-komponen tampilan Anda
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UserDashboard from '../views/UserDashboard.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AdminDocumentDetail from '../views/AdminDocumentDetail.vue'
import ProfilePage from '@/views/Profil/ProfilePage.vue'
import AdminLayout from '../components/AdminLayout.vue'
import ListSurat from '@/views/ListSurat.vue'
import DocumentApprovalPreview from '@/views/DocumentApprovalPreview.vue'
import KelengkapanData from '@/views/KelengkapanData.vue'
import FormatDocument from '@/views/FormatDocument.vue'

const router = createRouter({
  // Change from createWebHistory to createWebHashHistory
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/user/dashboard',
      name: 'user-dashboard',
      component: UserDashboard,
      meta: { requiresAuth: true, roles: ['user'] },
    },
    {
      path: '/user/kelengkapan/:id',
      name: 'user-kelengkapan',
      component: KelengkapanData,
      meta: { requiresAuth: true, roles: ['user'] },
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: ProfilePage,
      meta: { requiresAuth: true, roles: ['user'] },
    },
    {
      path: '/download-template',
      name: 'download-template',
      component: FormatDocument,
      meta: { requiresAuth: true, roles: ['user'] },
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAuth: true, roles: ['admin'] },
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard,
          meta: { title: 'Admin Dashboard' },
        },
        {
          path: 'surat',
          name: 'admin-surat',
          component: ListSurat,
          meta: { title: 'Admin Dashboard' },
        },
        {
          path: 'dokument',
          name: 'admin-dokument',
          component: DocumentApprovalPreview,
          meta: { title: 'Admin Dashboard' },
        },
        {
          path: 'document/:id',
          name: 'admin-document-detail',
          component: AdminDocumentDetail,
          meta: { title: 'Document Detail' },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (
    to.meta.requiresAuth &&
    to.meta.roles &&
    !to.meta.roles.includes(authStore.user?.role)
  ) {
    next('/')
  } else {
    next()
  }
})

export default router
