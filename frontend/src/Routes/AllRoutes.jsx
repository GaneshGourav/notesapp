import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Login } from "../Pages/login";
import { Signup } from "../Pages/signup";
import { Notes } from "../Pages/Notes";
import { PrivateRoutes } from "./PrivateRoutes";

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route
        path="/notes"
        element={
          <PrivateRoutes>
            <Notes />
          </PrivateRoutes>
        }
      ></Route>
    </Routes>
  );
}
