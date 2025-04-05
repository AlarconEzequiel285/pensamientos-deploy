"use client";

import { Layout } from "react-admin";

const MyLayout = (props: any) => {
  return (
    <>
      <Layout {...props} />
      <div className="fixed bottom-4 right-4 z-50">
  <button
    onClick={() => {
      localStorage.removeItem("token");
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
