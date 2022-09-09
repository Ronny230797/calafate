import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { useTableSearch } from "../../components/useTableSearch";
import InsertBusinessUnit from "./InsertBusinessUnit";
import AppBar from '../../components/appbar-basic';
import "../../styles/generic/table.scss"; 
import { useAlert } from "react-alert";

const { Search } = Input;
const { Column } = Table;
const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/Administration/Admin/GetAllBusinessUnit"
  );
  return { data };
};

export default function App() {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });
  const alert = useAlert();
  const API_URL_DELETE_BUSINESS_UNIT = "http://localhost:4000/Administration/Admin/DeleteBusinessUnit";

  const deleteBusinessUnit = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_BUSINESS_UNIT, requestOptions);
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload();
      } else {
        alert.show("Ocurrio un error al eliminar la unidad de negocio.");
      }
    } catch (error) {
      alert.show("Ocurrio un error al eliminar: " + error);
    }
  };


  return (
    <div>
      <AppBar />
      <div className="title-page">
        <h1>Unidades de negocio</h1>
          </div>
      <div className="container-search">
      <Search className='search'
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <InsertBusinessUnit />
      </div>

      <br /> <br />
      <Table className='table'
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="unidad_Negocio_ID" key="unidad_Negocio_ID" />
        <Column title="Nombre" dataIndex="unidad_Negocio_Name" key="unidad_Negocio_Name" />
        <Column title="Descripcion" dataIndex="unidad_Negocio_Description" key="unidad_Negocio_Description" />
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <InsertBusinessUnit  
              id={record.unidad_Negocio_ID}
              />
            </Space>
          )}
        />
        <Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => deleteBusinessUnit(record.unidad_Negocio_ID)}>Eliminar</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
