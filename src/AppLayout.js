import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main style={{ backgroundColor: "rgb(44, 44, 44)" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
