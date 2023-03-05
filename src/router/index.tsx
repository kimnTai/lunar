import React from "react";
import AdminHome from "../pages/admin/AdminHome";

const routes = [
    {
        name: "AdminHome",
        layout: "/admin",
        path: "/admin",
        component: <AdminHome />,
    },
];

export default routes;