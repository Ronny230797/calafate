import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { useTableSearch } from "../../components/useTableSearch";
import InsertTypeRole from "./InsertTypeRole";
import AppBarLogged from '../../components/appbar-logged.js';
import "../../styles/generic/table.scss"; 

const { Search } = Input;
const { Column } = Table;
const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/Administration/Admin/GetAllTypeRole"
  );
  return { data };
};

export default function App() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  const API_URL_DELETE_TYPE_ROLE =
  "http://localhost:4000/Administration/Admin/DeleteTypeRole";

  const deleteTypeRole = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_TYPE_ROLE, requestOptions);
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
        <h1>Tipo Role</h1>
          </div>
      <div className="container-search">
      <Search className='search'
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <InsertTypeRole />
      </div>

      <br /> <br />
      <Table className='table'
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="tipo_Role_ID" key="tipo_Role_ID" />
        <Column title="Tipo" dataIndex="tipo_Role_Name" key="tipo_Role_Name" />
        <Column title="Descripcion" dataIndex="tipo_Role_Description" key="tipo_Role_Description" />
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <InsertTypeRole  
              id={record.tipo_Role_ID}
              />
            </Space>
          )}
        />
        <Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => deleteTypeRole(record.tipo_Role_ID)}>Eliminar</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
