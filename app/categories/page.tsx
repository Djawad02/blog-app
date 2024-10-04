import React from "react";
import CrudForm from "../components/CrudForm";
import ProtectedRoute from "../components/ProtectedRoute";

const CategoryPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <CrudForm heading="Manage Categories" />
      </div>
    </ProtectedRoute>
  );
};

export default CategoryPage;
