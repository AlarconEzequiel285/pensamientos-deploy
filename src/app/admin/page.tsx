// src/app/admin/page.tsx

// Panel de administración con React Admin. Se conecta a los endpoints creados.

"use client";

import { useEffect, useState } from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import MyLayout from "./MyLayout"; // Layout personalizado con botón de cerrar sesión
import { PostList } from "./posts"; //Importamos nuestro listado personalizado

export default function AdminPanel() {
  // Estado para saber si ya estamos listos para renderizar el panel
  const [ready, setReady] = useState(false);

  // Estado que guarda el dataProvider (fuente de datos para React Admin)
  const [dataProvider, setDataProvider] = useState<any>(null);

  // Al montar el componente, inicializamos el dataProvider si estamos en el navegador
  useEffect(() => {
    if (typeof window !== "undefined") {
      // simpleRestProvider usa endpoints tipo REST (GET, POST, DELETE, etc.)
      setDataProvider(simpleRestProvider("/api"));

      // Marcamos el panel como listo para renderizar
      setReady(true);
    }
  }, []);

  // Si aún no está listo o no se cargó el dataProvider, mostramos un mensaje
  if (!ready || !dataProvider) return <p>Cargando panel de administración...</p>;

  return (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
      {/* Definimos un recurso llamado "posts" con componente personalizado */}
      <Resource name="posts" list={PostList} />
    </Admin>
  );
}
