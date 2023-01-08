import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { instance } from "../../API/instance.js";
import companyStyle from "../../css/company.module.css";
const UpdateCompany = () => {
  const url = "/Companies/";
  const navigate = useNavigate();
  const param = useParams();
  // 底下的 cname, cadddress, ccountry 用來存放使用者的修改資料
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
  // 此函式處理 name 屬性值改變的事件
  const nameChangeHandler = (e) => {
    setComName(e.target.value);
  };
  // 此函式處理 address 屬性值改變的事件
  const addressChangeHandler = (e) => {
    setComAddress(e.target.value);
  };
  // 此函式處理 country 屬性值改變的事件
  const countryChangeHandler = (e) => {
    setComCountry(e.target.value);
  };
  // 此函式實際進行 update（修改）的動作
  const updateCompanyHandler = (e) => {
    e.preventDefault();
    // 變數 objCom 將使用者變更的最新資料封裝成物件
    const objCom = {
      name: comName,
      address: comAddress,
      country: comCountry,
    };
    (async () => {
      try {
        const { data } = await instance.patch(url + param.id, objCom);
        console.log(data);
        alert("Company " + param.id + " updated!");
        // 導覽回「所有 company 列表」的頁面
        navigate("/company/");
      } catch (error) {
        console.log(error);
      }
    })();
  };
  // 底下 onSubmit 事件會呼叫上述的 updateCompanyHandler() 函式處理
  // 無論是「確定修改」或「取消」，皆會導覽回「所有 company 列表」的頁面
  return (
    <>
      <h1>Update Company Data</h1>
      <hr />
      <form onSubmit={updateCompanyHandler} id="data">
        <label htmlFor="email">
          <b>Name</b>
        </label>
        <input
          type="text"
          value={comName}
          onChange={nameChangeHandler}
          placeholder="Enter Name"
          name="comName"
          id="comName"
          required
        />
        <br />
        <label htmlFor="comAddress">
          <b>Address</b>
        </label>
        <input
          type="text"
          value={comAddress}
          onChange={addressChangeHandler}
          placeholder="Enter Address"
          name="comAddress"
          id="comAddress"
          required
        />
        <br />
        <label htmlFor="comCountry">
          <b>Country</b>
        </label>
        <input
          type="text"
          value={comCountry}
          onChange={countryChangeHandler}
          placeholder="Entry Country"
          name="comCountry"
          id="comCountry"
          required
        />
        <hr />
        <button
          type="submit"
          className={`${companyStyle.borderBtn} ${companyStyle.updateBtn}`}
        >
          確定修改
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
export default UpdateCompany;
