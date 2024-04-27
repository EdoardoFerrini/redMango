import React from "react";
import withAdminAuth from "../HOC/withAdminAuth";

function AuthenticationTestAdmin() {
  return <div>This page can be accessed just by Admin</div>;
}

export default withAdminAuth(AuthenticationTestAdmin);
