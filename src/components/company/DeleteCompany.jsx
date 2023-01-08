import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../../API/instance.js";
import companyStyle from "../../css/company.module.css";
const DeleteCompany = () => {
  const url = "/Companies/";
  const navigate = useNavigate();
  const param = useParams();
  // 底下的 cname, cadddress, ccountry 用來存放使用者要刪除的資料
  const [comName, setComName] = useState("");
  const [comAddress, setComAddress] = useState("");
  const [comCountry, setComCountry] = useState("");
  const getUrl = url + param.id;
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(getUrl);
        console.log(data); // 此處可以觀察伺服器回傳的資料
        // 底下設定從後端取回來的資料（依指定 id 值）
        setComName(data.company.name);
        setComAddress(data.company.address);
        setComCountry(data.company.country);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const deleteCompanyHandler = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const deleteResponse = await instance.delete(`/companies/${param.id}`);
        console.log(deleteResponse);
        alert("Company " + param.id + " deleted!");
        // 導覽回「所有 company 列表」的頁面
        navigate("/company/");
      } catch (error) {
        console.log(error);
      }
    })();
  };
  // 底下 onSubmit 事件會呼叫上述的 deleteCompanyHandler() 函式處理
  // 無論是「確定刪除」或「取消」，皆會導覽回「所有 company 列表」的頁面
  return (
    <>
      <h1>Update Company Data</h1>
      <hr />
      <form onSubmit={deleteCompanyHandler} id="data">
        <label>
          <b>Name</b>
        </label>
        <input type="text" value={comName} readOnly />
        <br />
        <label>
          <b>Address</b>
        </label>
        <input type="text" value={comAddress} readOnly />
        <br />
        <label>
          <b>Country</b>
        </label>
        <input type="text" value={comCountry} readOnly />
        <hr />
        <button
          type="submit"
          className={`${companyStyle.borderBtn} ${companyStyle.deleteBtn}`}
        >
          確定刪除
        </button>
        <button
          type="submit"
          onClick={() => navigate("/company")}
          className={`${companyStyle.borderBtn} ${companyStyle.cancelBtn}`}
        >
          取消
        </button>
      </form>
    </>
  );
};
export default DeleteCompany;
