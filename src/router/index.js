import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import PengajuanProses from '@/views/PengajuanProses.vue'
import ApproveDokumen from '@/views/ApproveDokumen.vue'
import ButuhTindakan from '@/views/User/ButuhTindakan.vue'
import PengajuanSelesai from '@/views/User/PengajuanSelesai.vue'
import PengajuanDitolak from '@/views/User/PengajuanDitolak.vue'

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

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
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
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Masuk - SIDARABALI',
        requiresGuest: true,
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
        title: 'Profil - SIDARABALI',
      },
    },
    {
      path: '/user/izin-selesai',
      name: 'izin-selesai',
      component: PengajuanSelesai,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Profil - SIDARABALI',
      },
    },
    {
      path: '/user/izin-ditolak',
      name: 'izin-ditolak',
      component: PengajuanDitolak,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Profil - SIDARABALI',
      },
    },
    {
      path: '/user/izin-butuh-tindakan',
      name: 'izin-butuh-tindakan',
      component: ButuhTindakan,
      meta: {
        requiresAuth: true,
        roles: ['user'],
        title: 'Profil - SIDARABALI',
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

let isNavigating = false

router.beforeEach(async (to, from, next) => {
  if (isNavigating) {
    return
  }
  isNavigating = true

  try {
    const authStore = useAuthStore()

    if (to.meta.title) {
      document.title = to.meta.title
    }

    if (to.meta.requiresGuest && authStore.isAuthenticated) {
      const userRole = authStore.user?.role
      const redirectPath = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'
      next(redirectPath)
      return
    }

    if (to.meta.requiresAuth) {
      if (!authStore.isAuthenticated) {
        sessionStorage.setItem('redirectPath', to.fullPath)
        next('/login')
        return
      }

      if (to.meta.roles && !to.meta.roles.includes(authStore.user?.role)) {
        const userRole = authStore.user?.role
        const fallbackPath = userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'
        next(fallbackPath)
        return
      }
    }

    if (to.path === '/login' && authStore.isAuthenticated) {
      const redirectPath = sessionStorage.getItem('redirectPath')
      if (redirectPath) {
        sessionStorage.removeItem('redirectPath')
        next(redirectPath)
        return
      }
    }

    next()
  } catch (error) {
    console.error('Navigation guard error:', error)
    next('/')
  }
})

router.beforeResolve((to, from, next) => {
  if (to.path !== from.path) {
    document.body.classList.add('page-loading')
  }
  next()
})

router.afterEach((to, from, failure) => {
  isNavigating = false

  setTimeout(() => {
    document.body.classList.remove('page-loading')
  }, 50)

  if (failure) {
    console.error('Navigation failed:', failure)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`Mapsd from ${from.path} to ${to.path}`)
  }
})

router.onError((error) => {
  console.error('Router error:', error)
})

export default router
