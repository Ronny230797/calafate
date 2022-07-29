import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { useTableSearch } from "../../components/useTableSearch";
import InsertOrderState from "./InsertOrderState";
import AppBar from '../../components/appbar-basic';
import "../../styles/generic/table.scss"; 

const { Search } = Input;
const { Column } = Table;
const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/Administration/Admin/GetAllOrderState"
  );
  return { data };
};

export default function App() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  const API_URL_DELETE_ORDER_STATE = "";

  const deleteOrderState = async (ID) => {
    try {
      console.log(ID);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_ORDER_STATE, requestOptions);
      if (response.status === 200) {
        alert("Se elimino correctamente.");
        window.location.reload();
      } else {
        alert("Ocurrio un error al eliminar el tipo de platillo.");
      }
    } catch (error) {
      alert("Ocurrio un error al eliminar: " + error);
    }
  };


  return (
    <div>
      <AppBar />
      <div className="title-page">
        <h1>Estado de las ordenes</h1>
          </div>
      <div className="container-search">
      <Search className='search'
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      {/**<InsertOrderState />**/}
      </div>

      <br /> <br />
      <Table className='table'
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="order_Estado_ID" key="order_Estado_ID" />
        <Column title="Estado" dataIndex="fK_Estado_Order_Estado_Name" key="fK_Estado_Order_Estado_Name" />
        <Column title="Fecha" dataIndex="order_Estado_Date" key="order_Estado_Date" />
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <InsertOrderState  
              id={record.order_Estado_ID}
              />
            </Space>
          )}
        />
        {/**<Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => deleteOrderState(record.order_Estado_ID)}>Eliminar</a>
            </Space>
          )}
          />**/}
      </Table>
    </div>
  );
}
