import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { instance } from "../../API/instance.js";
import deleteCompany from "./DeleteCompany";
import companyStyle from "../../css/company.module.css";
const ListCompany = () => {
  const url = "/Companies";
  // 底下的 companies 是用來存放「所有 company 資料」
  // 而 setCompanies() 是用來設定 companies 的值
  // 只要有任何設定的動作，頁面皆會重新渲染（render）
  const [companies, setCompanies] = useState([]);
  // 定義一個函式去取得「所有 company」的資料
  const getCompanies = () => {
    (async () => {
      try {
        const { data } = await instance.get(url);
        console.log(data); // 此處可以觀察伺服器回傳的資料
        // 此處將取得的資料設定給 companies
        // 至於為何是取 data.companies 而不是 data，主要取決於
        // 觀察上述 console.log() 的回傳資料格式
        setCompanies(data.companies);
        console.log(companies);
      } catch (error) {
        console.log(error);
      }
    })();
  };
  useEffect(() => {
    // 實際執行取得「所有 company」資料的動作
    getCompanies();
  }, []);
  // 底下將所取得的所有 company 資料，以表格方式呈現
  // 每一筆 company 資料最後，皆額外安排二個按鈕/超連結
  // 二個按鈕/超連結分別是「修改」（Update）和「刪除」（Delete）
  // 其中「修改」（Update）必須切換至修改頁面，因此以超連結方式
  // 而「刪除」（Delete）僅執行刪除動作，因此以按鈕方式
  // 兩者皆需傳入要「修改」或「刪除」的 company 的 id
  return (
    <>
      <div className={companyStyle.container}>
        <h1>公司資料列表</h1>
        <table border="1">
          <thead>
            <tr>
              <th>名稱</th>
              <th>住址</th>
              <th>國家</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {companies &&
              companies.map((company, index) => {
                return (
                  <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.address}</td>
                    <td>{company.country}</td>
                    <td>
                      <NavLink
                        to={"/UpdateCompany/" + company.id}
                        className={`${companyStyle.borderBtn} ${companyStyle.updateBtn}`}
                      >
                        修改
                      </NavLink>
                      <NavLink
                        to={"/DeleteCompany/" + company.id}
                        className={`${companyStyle.borderBtn} ${companyStyle.deleteBtn}`}
                      >
                        刪除
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ListCompany;
