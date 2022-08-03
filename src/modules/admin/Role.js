import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { useTableSearch } from "../../components/useTableSearch";
import InsertRole from "./InsertRole";
import AppBar from '../../components/appbar-basic';
import "../../styles/generic/table.scss"; 

const { Search } = Input;
const { Column } = Table;
const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/Administration/Admin/GetAllRole"
  );
  return { data };
};

export default function App() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  const API_URL_DELETE_ROLE = "http://localhost:4000/Administration/Admin/DeleteRole";

  const deleteRole = async (ID) => {
    try {
      console.log(ID);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_ROLE, requestOptions);
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
        <h1>Roles</h1>
          </div>
      <div className="container-search">
      <Search className='search'
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <InsertRole />
      </div>

      <br /> <br />
      <Table className='table'
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="role_ID" key="role_ID" />
        <Column title="Usuario" dataIndex="usuario_Username" key="usuario_Username" />
        <Column title="Role asignado" dataIndex="tipo_Role_Name" key="tipo_Role_Name" />
        <Column title="Fecha creación" dataIndex="role_Date" key="role_Date" />
        <Column title="Descripción" dataIndex="role_Description" key="role_Description" />
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <InsertRole  
              id={record.role_ID}
              />
            </Space>
          )}
        />
        <Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => deleteRole(record.role_ID)}>Eliminar</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
