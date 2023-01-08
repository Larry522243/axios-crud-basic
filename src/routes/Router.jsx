import React from "react";
import { Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import Home from "../pages/Home";
import Company from "../pages/Company";
import About from "../pages/About";
import Nav from "../components/Nav";
import CreateCompany from "../components/company/CreateCompany";
import UpdateCompany from "../components/company/UpdateCompany";
import DeleteCompany from "../components/company/DeleteCompany";
// 用 createBrowserRouter 建立 BrowserRouter 物件
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Nav />}>
      <Route index element={<Home />} />
      <Route path="Company" element={<Company />} />
      <Route path="About" element={<About />} />
      <Route path="CreateCompany" element={<CreateCompany />} />
      <Route path="UpdateCompany/:id" element={<UpdateCompany />} />
      <Route path="DeleteCompany/:id" element={<DeleteCompany />} />
    </Route>
  )
);
export default router;
