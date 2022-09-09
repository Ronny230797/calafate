import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { useTableSearch } from "../../components/useTableSearch";
import InsertExtra from "./InsertExtra";
import AppBar from '../../components/appbar-basic';
import "../../styles/generic/table.scss"; 
import { useAlert } from "react-alert";
const { Search } = Input;
const { Column } = Table;
const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/Administration/Admin/GetAllExtra"
  );
  return { data };
};

export default function App() {
  const [searchVal, setSearchVal] = useState(null);
  const alert = useAlert();
  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  const API_URL_DELETE_EXTRA = "http://localhost:4000/Administration/Admin/DeleteExtra";

  const deleteExtra = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_EXTRA, requestOptions);
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload();
      } else {
        alert.show("Ocurrio un error al eliminar la extra.");
      }
    } catch (error) {
      alert.show("Ocurrio un error al eliminar: " + error);
    }
  };


  return (
    <div>
      <AppBar />
      <div className="title-page">
        <h1>Extras</h1>
          </div>
      <div className="container-search">
      <Search className='search'
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <InsertExtra />
      </div>

      <br /> <br />
      <Table className='table'
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="extra_ID" key="extra_ID" />
        <Column title="Nombre" dataIndex="extra_Name" key="extra_Name" />
        <Column title="Descripcion" dataIndex="extra_Description" key="extra_Description" />
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <InsertExtra  
              id={record.extra_ID}
              />
            </Space>
          )}
        />
        <Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => deleteExtra(record.extra_ID)}>Eliminar</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
