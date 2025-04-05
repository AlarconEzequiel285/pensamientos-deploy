"use client";

import { useEffect, useState } from "react";
import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import  MyLayout from "./MyLayout";

export default function AdminPanel() {
  const [ready, setReady] = useState(false);
  const [dataProvider, setDataProvider] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDataProvider(simpleRestProvider("/api"));
      setReady(true);
    }
  }, []);

  if (!ready || !dataProvider) return <p>Cargando panel de administración...</p>;

  return (
    <Admin dataProvider={dataProvider} layout={MyLayout}>
      <Resource name="posts" list={ListGuesser} />
    </Admin>
  );
}
