import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import companyStyle from "../../css/company.module.css";
import { instance } from "../../API/instance.js";
const CreateCompany = () => {
  const navigate = useNavigate();
  const url = "/Companies";
  // 底下的 cname, cadddress, ccountry 用來存放使用者輸入的資料
  const [cname, setCname] = useState("");
  const [caddress, setCaddress] = useState("");
  const [ccountry, setCcountry] = useState("");
  const newCompanyHandler = (e) => {
    e.preventDefault();
    // 變數 obj 將所有使用者輸入的資料封裝成物件
    const obj = {
      name: "" || cname,
      address: "" || caddress,
      country: "" || ccountry,
    };
    (async () => {
      try {
        // 執行實際「新增 company」的動作
        const postResponse = await instance.post(url, JSON.stringify(obj));
        console.log(postResponse);
        // 將存放資料輸入的變數，全部設定回空值
        setCname("");
        setCaddress("");
        setCcountry("");
        alert("New Company has been created!");
        // 導覽回「所有 company 列表」的頁面
        navigate("/company/");
      } catch (error) {
        console.log(error);
      }
    })();
  };
  // 底下 onChange() 事件處理函式，用來隨時記錄任何的輸入變動
  return (
    <div className={companyStyle.container}>
      <h1>新增 Company</h1>
      <hr />
      <form onSubmit={newCompanyHandler}>
        <label htmlFor="cname">
          <b>Name</b>
        </label>
        <input
          type="text"
          value={cname}
          placeholder="Enter Name"
          name="cname"
          id="cname"
          onChange={(e) => {
            setCname(e.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="caddress">
          <b>Address</b>
        </label>
        <input
          type="text"
          value={caddress}
          placeholder="Enter Address"
          name="caddress"
          id="caddress"
          onChange={(e) => {
            setCaddress(e.target.value);
          }}
          required
        />
        <br />
        <label htmlFor="ccountry">
          <b>Country</b>
        </label>
        <input
          type="text"
          value={ccountry}
          placeholder="Enter Country"
          name="ccountry"
          id="ccountry"
          onChange={(e) => {
            setCcountry(e.target.value);
          }}
          required
        />
        <hr />
        <button type="submit" className={companyStyle.createbtn}>
          Create
        </button>
      </form>
    </div>
  );
};
export default CreateCompany;
