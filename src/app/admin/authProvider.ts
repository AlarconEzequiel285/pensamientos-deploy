// src/app/admin/authProvider.ts

//Manejo de autenticación por React Admin

// Este objeto es requerido por React Admin para manejar autenticación
const authProvider = {
  // Función de login: se llama cuando el usuario intenta iniciar sesión desde el panel
  login: async ({ username, password }: any) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      // Si las credenciales no son válidas, lanzamos un error
      throw new Error("Login fallido");
    }

    // Si el login es exitoso, guardamos el token JWT en localStorage
    const { token } = await res.json();
    localStorage.setItem("token", token);
  },

  // Función de logout: elimina el token y redirige al usuario a la página principal
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // 🔄 Redirección manual
    return Promise.resolve();
  },

  // Verifica si el usuario está autenticado (si hay token)
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  // Función requerida por React Admin, pero no la usamos por ahora
  getPermissions: () => Promise.resolve(),

  // También requerida por React Admin: podrías usarla para manejar errores específicos
  checkError: () => Promise.resolve(),
};

export default authProvider;
