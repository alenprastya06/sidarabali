import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

const API_URL = 'https://bitwize.cloud/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    isInitialized: false, // Flag untuk menandakan store sudah terinisialisasi
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    isAdmin: (state) => state.user && state.user.role === 'admin',
  },
  actions: {
    // Method untuk inisialisasi store dari localStorage
    initialize() {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')

        if (token && userStr) {
          this.token = token
          this.user = JSON.parse(userStr)
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }

        this.isInitialized = true
      } catch (error) {
        console.error('Error initializing auth store:', error)
        this.clearAuth()
        this.isInitialized = true
      }
    },

    // Method untuk membersihkan data auth
    clearAuth() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('id')
      delete axios.defaults.headers.common['Authorization']
    },

    // Method untuk verifikasi token dengan server
    async verifyToken() {
      if (!this.token) return false

      try {
        const response = await axios.get(`${API_URL}/verify`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })

        // Update user data jika ada perubahan dari server
        if (response.data.user) {
          this.user = response.data.user
          localStorage.setItem('user', JSON.stringify(this.user))
        }

        return true
      } catch (error) {
        console.error('Token verification failed:', error)
        this.clearAuth()
        return false
      }
    },

    async register(userData) {
      this.loading = true
      this.error = null
      try {
        await axios.post(`${API_URL}/register`, userData)
        this.loading = false
        return true
      } catch (err) {
        this.loading = false
        this.error = err.response?.data?.message || 'Registration failed.'
        return false
      }
    },

    async login(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${API_URL}/login`, credentials)

        this.token = response.data.token
        this.user = response.data.user

        // Simpan ke localStorage
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('id', this.user.id)

        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        this.loading = false

        // Redirect berdasarkan role
        const redirectPath = this.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'
        router.push(redirectPath)

        return true
      } catch (err) {
        this.loading = false
        this.error = err.response?.data?.message || 'Login failed.'
        return false
      }
    },

    logout() {
      this.clearAuth()
      router.push('/login')
    },

    // Method untuk refresh user data
    async refreshUser() {
      if (!this.isAuthenticated) return false

      try {
        const response = await axios.get(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })

        this.user = response.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      } catch (error) {
        console.error('Failed to refresh user data:', error)
        return false
      }
    },
  },
})
