
"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";

// Componente de login para el panel de administración
export default function AdminLogin() {
  // Estados locales para manejar el usuario, contraseña y posibles errores
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // Hook de Next.js para redireccionar

  // Función que se ejecuta al hacer clic en "Ingresar"
  const handleLogin = async () => {
    // Enviamos una petición POST al endpoint de login con los datos del formulario
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      // Si el login fue exitoso, almacenamos el token en localStorage
      const data = await res.json();
      localStorage.setItem("adminToken", data.token);

      // Redirigimos al panel de admin
      router.push("/admin");
    } else {
      // Si falla, mostramos un mensaje de error
      setError("Credenciales inválidas");
    }
  };

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login de Admin</h1>

      {/* Mensaje de error si las credenciales son incorrectas */}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Campo para el nombre de usuario */}
      <input
        type="text"
        placeholder="Usuario"
        className="border p-2 w-full mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Campo para la contraseña */}
      <input
        type="password"
        placeholder="Contraseña"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Botón que inicia la función de login */}
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Ingresar
      </button>
    </main>
  );
}
