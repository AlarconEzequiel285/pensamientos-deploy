// src/app/admin/MyLayout.tsx

//Este archivo es para integrar un botón de cerrar sesión, sino se me complicaba ponerlo en el layout que ya traía por default my react admin

"use client";

import { Layout } from "react-admin";

// Este componente extiende el layout por defecto de React Admin
// y le agrega un botón fijo para cerrar sesión.
const MyLayout = (props: any) => {
  return (
    <>
      {/* Renderiza el layout estándar de React Admin */}
      <Layout {...props} />

      {/* Botón flotante para cerrar sesión, ubicado abajo a la derecha */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => {
            // Al hacer clic, eliminamos el token del localStorage
            localStorage.removeItem("token");

            // Y redirigimos al usuario a la página principal
            window.location.href = "/";
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 shadow-md"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default MyLayout;
