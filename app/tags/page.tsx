import React from "react";
import CrudForm from "../components/CrudForm";
import ProtectedRoute from "../components/ProtectedRoute";

const TagPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <CrudForm heading="Manage Tags" />
      </div>
    </ProtectedRoute>
  );
};

export default TagPage;
