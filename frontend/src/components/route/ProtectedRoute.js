import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

// component app.js se aa rha h aur rest wo saare properties hoge jaise exact & path

const ProtectedRoute = ({ isAdmin, isSeller,component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/login" />;
            }
            if (isSeller === true && user.role !== "seller") {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
