// src/app/admin/authProvider.ts
const authProvider = {
    login: async ({ username, password }: any) => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!res.ok) {
        throw new Error("Login fallido");
      }
  
      const { token } = await res.json();
      localStorage.setItem("token", token);
    },
  
    logout: () => {
      localStorage.removeItem("token");
      // Redirigimos a la página principal
      window.location.href = "/";
      return Promise.resolve();
    },
  
    checkAuth: () => {
      return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
    },
  
    getPermissions: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
  };
  
  export default authProvider;
  