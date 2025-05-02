import { defineStore } from "pinia"
import { $api } from "~/utils/plain-fetch"

export const useSessionStore = defineStore('session', () => {
  const session = ref(null)
  const toast = useToastService()
  const loading = ref(false)

  const login = async (credentials) => {
    const { email, password } = credentials
    loading.value = true
    let token = ''
    try {
      const { setToken } = useNuxtApp().$authCookie
      const response = await $api('/login', {
        method: 'POST',
        body: { email, password },
        onResponse: ({ response }) => {
          if (response.headers.get('Authorization')) {
            token = response.headers.get('Authorization')?.replace('Bearer ', '')
            setToken(token)
          }

        }
      })
      session.value = response
      toast.add({
        severity: 'success',
        summary: 'Sesión',
        detail: 'Sesión iniciada correctamente',
        life: 3000
      })
      
      const role = response.role.slug
      switch (role) {
        case 'admin':
          navigateTo('/admin')
          break
        case 'helper':
          navigateTo('/helper')
          break
        case 'auditor':
          navigateTo('/auditor')
          break
        case 'regular':
          navigateTo('/regular')
          break
      }
      return response
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Sesión',
        detail: error.data?.message ?? error.name,
        life: 3000
      })
      return {
        error: error.data.message
      }
    } finally {
      loading.value = false
    }
  }

  const updatePassword = async (newPassword) => {
    loading.value = true
    try {
      const response = await $api('/auth/password', {
        method: 'PATCH',
        body: { password: newPassword }
      })
      toast.add({
        severity: 'success',
        summary: 'Contraseña',
        detail: 'Contraseña actualizada correctamente',
        life: 3000
      })
      return response
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Contraseña',
        detail: error.data.message ?? error.name,
        life: 3000
      })
      return {
        error: error.data.message
      }
    } finally {
      loading.value = false
    }
  }

  const recoverSession = async () => {
    loading.value = true
    try {
      const { getToken } = useNuxtApp().$authCookie
      if (!getToken()) return

      const response = await $api('/me')
      session.value = response
      return response
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Sesión',
        detail: 'No se pudo recuperar la sesión. Intenta iniciar sesión nuevamente',
        life: 3000
      })
      return {
        error: error.data?.message ?? error.name
      }
    } finally {
      loading.value = false
    }


    // const userData = localStorage.getItem('userData')
    // if (userData) {
    //   session.value = JSON.parse(userData)
    // }
  }

  const fetchUserData = async () => {
    loading.value = true
    try {
      const response = await $api('/me')
      session.value = response
      return response
    } catch (error) {
      return {
        error: error.data.message
      }
    } finally {
      loading.value = false
    }
  }

  const role = computed(() => {
    return session.value?.role
  })

  const roleDisplay = computed(() => {
    switch (role.value) {
      case 'admin':
        return 'Administrador'
      case 'employee':
        return 'Empleado'
    }
  })

  const logout = () => {
    // todo: call to logout endpoint
    navigateTo('/login')
    session.value = null
    const { removeToken } = useNuxtApp().$authCookie
    removeToken()
    toast.add({
      severity: 'success',
      summary: 'Sesión',
      detail: 'Sesión cerrada correctamente',
      life: 3000
    })
  }

  return {
    session,
    loading,
    login,
    logout,
    recoverSession,
    updatePassword,
    fetchUserData,
    role,
    roleDisplay,
  }
})