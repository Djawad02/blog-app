import React from "react";
import Home from "../page";
import CrudForm from "../components/CrudForm";
import ProtectedRoute from "../components/ProtectedRoute";

const BlogPage = () => {
  return (
    <ProtectedRoute>
      <div>
        <CrudForm heading="Manage Blogs" />
      </div>
    </ProtectedRoute>
  );
};

export default BlogPage;
