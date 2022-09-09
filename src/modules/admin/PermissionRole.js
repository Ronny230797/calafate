import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { useTableSearch } from "../../components/useTableSearch";
import InsertPermissionRole from "./InsertPermissionRole";
import AppBar from '../../components/appbar-basic';
import "../../styles/generic/table.scss"; 

const { Search } = Input;
const { Column } = Table;
const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/Administration/Admin/GetAllPermissionRole"
  );
  return { data };
};

export default function App() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  const API_URL_DELETE_PERMISSION_ROLE =
  "http://localhost:4000/Administration/Admin/DeletePermissionRole";

  const deletePermissionRole = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_PERMISSION_ROLE, requestOptions);
      if (response.status === 200) {
        alert("Se elimino correctamente.");
        window.location.reload();
      } else {
        alert("Ocurrio un error al eliminar el permiso.");
      }
    } catch (error) {
      alert("Ocurrio un error al eliminar: " + error);
    }
  };


  return (
    <div>
      <AppBar />
      <div className="title-page">
        <h1>Permisos y roles</h1>
          </div>
      <div className="container-search">
      <Search className='search'
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <InsertPermissionRole />
      </div>

      <br /> <br />
      <Table className='table'
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="permiso_Role_ID" key="permiso_Role_ID" />
        <Column title="Tipo permiso" dataIndex="tipo_Permiso_Name" key="tipo_Permiso_Name" />
        <Column title="Tipo role" dataIndex="tipo_Role_Name" key="tipo_Role_Name" />
        <Column title="Fecha creación" dataIndex="dateCreated" key="dateCreated" />
        <Column title="Estado del role" dataIndex="isActive" key="isActive" />
        
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <InsertPermissionRole  
              id={record.permiso_Role_ID}
              />
            </Space>
          )}
        />
        <Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => deletePermissionRole(record.permiso_Role_ID)}>Eliminar</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
