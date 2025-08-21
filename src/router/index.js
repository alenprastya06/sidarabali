import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import PengajuanProses from '@/views/PengajuanProses.vue'
import ApproveDokumen from '@/views/ApproveDokumen.vue'
import ButuhTindakan from '@/views/User/ButuhTindakan.vue'
import PengajuanSelesai from '@/views/User/PengajuanSelesai.vue'
import PengajuanDitolak from '@/views/User/PengajuanDitolak.vue'
import SuksesActivasi from '@/views/User/SuksesActivasi.vue'
import ResetPassword from '@/views/User/ResetPassword.vue'
import ForgotPassword from '@/views/User/ForgotPassword.vue'
import ListSemuaSurat from '@/views/Admin/ListSemuaSurat.vue'

const UserDashboard = () => import('../views/UserDashboard.vue')
const AdminDashboard = () => import('../views/AdminDashboard.vue')
const AdminDocumentDetail = () => import('../views/AdminDocumentDetail.vue')
const ProfilePage = () => import('@/views/Profil/ProfilePage.vue')
const AdminLayout = () => import('../components/AdminLayout.vue')
const ListSurat = () => import('@/views/ListSurat.vue')
const DocumentApprovalPreview = () => import('@/views/DocumentApprovalPreview.vue')
const KelengkapanData = () => import('@/views/KelengkapanData.vue')
const FormatDocument = () => import('@/views/FormatDocument.vue')
const HalamanPermohonan = () => import('@/views/HalamanPermohonan.vue')
const BerkasSaya = () => import('@/views/BerkasSaya.vue')
const AkunSaya = () => import('@/views/AkunSaya.vue')
const PemilikDokumen = () => import('@/views/PemilikDokumen.vue')

// Helper function to validate token
const validateToken = async (token) => {
  if (!token) return false

  try {
    // Check if token is expired (assuming JWT structure)
    const payload = JSON.parse(atob(token.split('.')[1]))
    const isExpired = payload.exp * 1000 < Date.now()

    if (isExpired) {
      return false
    }

    // Optional: Make API call to verify token with backend
    // const response = await fetch('/api/verify-token', {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // })
    // return response.ok

    return true
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

// Helper function to remove token and clear auth state
const clearAuthAndRedirect = () => {
  // Remove token from localStorage/sessionStorage
  localStorage.removeItem('auth_token')
  localStorage.removeItem('access_token')
  sessionStorage.removeItem('auth_token')
  sessionStorage.removeItem('access_token')

  // Clear any auth-related cookies
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
  })

  // Clear auth store
  const authStore = useAuthStore()
  authStore.logout()

  return '/'
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/aktivasi-email/:token',
      name: 'activasi-email',
      component: SuksesActivasi,
      meta: {
        title: 'Aktivasi Email - SIDARABALI',
        isPublic: true,
      },
      props: true,
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetPassword,
      meta: {
        title: 'Reset Password - SIDARABALI',
        isPublic: true,
      },
      props: true,
    },

    {
      path: '/activate',
      name: 'activate-email',
      component: SuksesActivasi,
      meta: {
        title: 'Aktivasi Email - SIDARABALI',
      },
      props: (route) => ({
        token: route.query.token,
        email: route.query.email,
      }),
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Beranda - SIDARABALI',
        keepAlive: true,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Daftar - SIDARABALI',
        requiresGuest: true,
        isPublic: true,
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot',
      component: ForgotPassword,
      meta: {
        title: 'Forgot Password - SIDARABALI',
        isPublic: true,
        requiresGuest: true,
      },
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Masuk - SIDARABALI',
        requiresGuest: true,
        isPublic: true,
      },
    },
    {
      path: '/user/dashboard',
      name: 'user-dashboard',
      component: UserDashboard,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Dashboard - SIDARABALI',
        keepAlive: true,
      },
    },
    {
      path: '/user/kelengkapan/:id',
      name: 'user-kelengkapan',
      component: KelengkapanData,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Kelengkapan Data - SIDARABALI',
      },
      props: true,
    },
    {
      path: '/user/halaman-permohonan',
      name: 'halaman-permohonan',
      component: HalamanPermohonan,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Buat Permohonan - SIDARABALI',
      },
    },
    {
      path: '/user/pemilik-dokumen',
      name: 'pemilik-dokumen',
      component: PemilikDokumen,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Buat Pengajuan - SIDARABALI',
      },
    },
    {
      path: '/user/pemilik-dokumen/:id_pengajuan',
      name: 'pemilik-dokumen-with-id',
      component: PemilikDokumen,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Buat Pengajuan - SIDARABALI',
      },
      props: true,
    },
    {
      path: '/user/berkas-saya',
      name: 'berkas-saya',
      component: BerkasSaya,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Berkas Saya - SIDARABALI',
        keepAlive: true,
      },
    },
    {
      path: '/user/akun-saya',
      name: 'akun-saya',
      component: AkunSaya,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Akun Saya - SIDARABALI',
      },
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: ProfilePage,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Profil - SIDARABALI',
      },
    },
    {
      path: '/user/pengajuan-proses',
      name: 'pengajuan-prses',
      component: PengajuanProses,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Pengajuan Proses - SIDARABALI',
      },
    },
    {
      path: '/user/izin-selesai',
      name: 'izin-selesai',
      component: PengajuanSelesai,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Izin Selesai - SIDARABALI',
      },
    },
    {
      path: '/user/izin-ditolak',
      name: 'izin-ditolak',
      component: PengajuanDitolak,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Izin Ditolak - SIDARABALI',
      },
    },
    {
      path: '/user/izin-butuh-tindakan',
      name: 'izin-butuh-tindakan',
      component: ButuhTindakan,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Butuh Tindakan - SIDARABALI',
      },
    },
    {
      path: '/download-template',
      name: 'download-template',
      component: FormatDocument,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Template Dokumen - SIDARABALI',
      },
    },
    {
      path: '/admin',
      component: AdminLayout,
      meta: {
        requiresAuth: true,
        roles: ['admin'],
        title: 'Admin Panel - SIDARABALI',
      },
      children: [
        {
          path: '',
          redirect: 'dashboard',
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: AdminDashboard,
          meta: {
            title: 'Admin Dashboard - SIDARABALI',
            keepAlive: true,
          },
        },
        {
          path: 'surat',
          name: 'admin-surat',
          component: ListSurat,
          meta: {
            title: 'Manajemen Surat - SIDARABALI',
            keepAlive: true,
          },
        },
        {
          path: 'list-surat',
          name: 'list-surat',
          component: ListSemuaSurat,
          meta: {
            title: 'Manajemen Surat - SIDARABALI',
            keepAlive: true,
          },
        },
        {
          path: 'dokument',
          name: 'admin-dokument',
          component: DocumentApprovalPreview,
          meta: {
            title: 'Persetujuan Dokumen - SIDARABALI',
          },
        },
        {
          path: 'dokument-approve',
          name: 'dokument-approve',
          component: ApproveDokumen,
          meta: {
            title: 'Dokumen disetujui - SIDARABALI',
          },
        },
        {
          path: 'document/:id',
          name: 'admin-document-detail',
          component: AdminDocumentDetail,
          meta: {
            title: 'Detail Dokumen - SIDARABALI',
          },
          props: true,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(savedPosition)
        }, 100)
      })
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ top: 0, behavior: 'smooth' })
        }, 100)
      })
    }
  },
})

router.beforeEach(async (to, from, next) => {
  try {
    const authStore = useAuthStore()

    // Set document title
    if (to.meta.title) {
      document.title = to.meta.title
    }

    // Handle public routes (like activation) - allow access without authentication
    if (
      to.meta.isPublic ||
      to.name === 'activasi-email' ||
      to.name === 'activate-email' ||
      to.name === 'forgot-password'
    ) {
      console.log('Public route detected, allowing access')
      next()
      return
    }

    // Get token from various sources
    const token =
      authStore.token ||
      localStorage.getItem('auth_token') ||
      localStorage.getItem('access_token') ||
      sessionStorage.getItem('auth_token') ||
      sessionStorage.getItem('access_token')

    // Validate token if it exists
    if (token) {
      const isValidToken = await validateToken(token)

      if (!isValidToken) {
        console.log('Invalid or expired token detected, clearing auth and redirecting to home')
        const redirectPath = clearAuthAndRedirect()
        next(redirectPath)
        return
      }
    }

    // If no token and route requires authentication
    if (!token && to.meta.requiresAuth) {
      console.log('No valid token found for protected route, redirecting to home')
      const redirectPath = clearAuthAndRedirect()
      next(redirectPath)
      return
    }

    // Redirect authenticated users away from guest-only pages
    if (to.meta.requiresGuest && authStore.isAuthenticated && token) {
      const isValidToken = await validateToken(token)

      if (!isValidToken) {
        // If token is invalid, allow access to guest pages
        next()
        return
      }

      const userRole = authStore.user?.role
      const redirectPath = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'
      next(redirectPath)
      return
    }

    // Check authentication for protected routes
    if (to.meta.requiresAuth) {
      if (!authStore.isAuthenticated || !token) {
        console.log('Authentication required but user not authenticated, redirecting to home')
        const redirectPath = clearAuthAndRedirect()
        next(redirectPath)
        return
      }

      // Double-check token validity for protected routes
      const isValidToken = await validateToken(token)
      if (!isValidToken) {
        console.log('Token validation failed for protected route, redirecting to home')
        const redirectPath = clearAuthAndRedirect()
        next(redirectPath)
        return
      }

      // Check role-based access
      if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
        const userRole = authStore.user?.role
        const fallbackPath = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'
        next(fallbackPath)
        return
      }
    }

    // Handle login redirect for authenticated users
    if (to.path === '/login' && authStore.isAuthenticated && token) {
      const isValidToken = await validateToken(token)

      if (!isValidToken) {
        const redirectPath = clearAuthAndRedirect()
        next(redirectPath)
        return
      }

      const redirectPath = sessionStorage.getItem('redirectPath')
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath')
        next(redirectPath)
        return
      }

      // Default redirect based on user role
      const userRole = authStore.user?.role
      const defaultPath = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'
      next(defaultPath)
      return
    }

    next()
  } catch (error) {
    console.error('Navigation guard error:', error)
    // On any error, clear auth and redirect to home
    const redirectPath = clearAuthAndRedirect()
    next(redirectPath)
  }
})

router.beforeResolve((to, from, next) => {
  if (to.path !== from.path) {
    document.body.classList.add('page-loading')
  }
  next()
})

router.afterEach((to, from, failure) => {
  setTimeout(() => {
    document.body.classList.remove('page-loading')
  }, 50)

  if (failure) {
    console.error('Navigation failed:', failure)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`Navigated from ${from.path} to ${to.path}`)
  }
})

router.onError((error) => {
  console.error('Router error:', error)
})

export default router
