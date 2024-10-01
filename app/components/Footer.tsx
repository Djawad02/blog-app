import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-300">
      <div className="container mx-auto flex justify-center py-12">
        <div className="py-5">
          <div className="flex gap-6 justify-center">
            <p className="p-5 text-gray-500">
              Copyright ©2024 All rights reserved | This template is made by
              Dania Jawad.
            </p>
          </div>
          <p className="text-gray-500 text-center">Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
