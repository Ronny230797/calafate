import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { useTableSearch } from "../../components/useTableSearch";
import InsertUser from "./InsertUser";
import AppBarLogged from '../../components/appbar-logged.js';
import "../../styles/generic/table.scss"; 

const { Search } = Input;
const { Column } = Table;
const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/Administration/Admin/GetAllUser"
  );
  return { data };
};

export default function App() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  const API_URL_DELETE_TYPE_Dish =
  "http://localhost:4000/Administration/Admin/DeleteUser";

  const deleteUser = async (ID) => {
    try {
      console.log(ID);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_TYPE_Dish, requestOptions);
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
      <AppBarLogged />
      <div className="title-page">
        <h1>Usuarios</h1>
          </div>
      <div className="container-search">
      <Search className='search'
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <InsertUser />
      </div>

      <br /> <br />
      <Table className='table'
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="usuario_ID" key="usuario_ID" />
        <Column title="Primer nombre" dataIndex="firstName" key="firstName" />
        <Column title="Segundo nombre" dataIndex="usuario_Second_Name" key="usuario_Second_Name" />
        <Column title="Primer apellido" dataIndex="usuario_First_Last_Name" key="usuario_First_Last_Name" />
        <Column title="Segundo Apellido" dataIndex="usuario_Second_Last_Name" key="usuario_Second_Last_Name" />
        <Column title="Apodo - nombre de usuario" dataIndex="usuario_Username" key="usuario_Username" />
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <InsertUser  
              id={record.usuario_ID}
              />
            </Space>
          )}
        />
        <Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => deleteUser(record.usuario_ID)}>Eliminar</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
