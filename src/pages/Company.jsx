import React from "react";
import { useNavigate } from "react-router-dom";
import ListCompany from "../components/company/ListCompany";
import companyStyle from "../css/company.module.css";
const Company = () => {
  const navigate = useNavigate();
  // 此頁面呈現二部份，一個是「建立新公司」按鈕
  // 另一個是「所有 company 資料」的列表
  return (
    <>
      <button
        className={companyStyle.createSmall}
        onClick={() => navigate("/CreateCompany")}
      >
        建立新公司
      </button>
      <ListCompany />
    </>
  );
};
export default Company;
