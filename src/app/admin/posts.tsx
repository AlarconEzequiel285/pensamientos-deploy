// src/app/admin/posts.tsx

// Componente personalizado para listar pensamientos en el panel de administración.
// Reemplaza a ListGuesser para evitar errores de interpretación de tipos en columnas como "downvotes".

import { List, Datagrid, TextField, NumberField, DateField } from "react-admin";

export const PostList = () => (
  <List>
    <Datagrid>
      {/* ID del pensamiento */}
      <TextField source="id" />

      {/* Contenido del pensamiento */}
      <TextField source="content" />

      {/* Número de votos positivos */}
      <NumberField source="upvotes" />

      {/* Número de votos negativos */}
      <NumberField source="downvotes" />

      {/* Fecha de publicación */}
      <DateField source="fecha" />
    </Datagrid>
  </List>
);
