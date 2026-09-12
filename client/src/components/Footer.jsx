import React from "react";

function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 py-4">
      © {new Date().getFullYear()} Rental Management System. All rights reserved.
    </footer>
  );
}

export default Footer;