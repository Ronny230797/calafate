import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import axios from "axios";
import { useTableSearch } from "../../components/useTableSearch";
import InsertTypeDish from "./InsertTypeDish";
import AppBarLogged from '../../components/appbar-logged.js';
import "../../styles/generic/table.scss"; 
import { useAlert } from "react-alert";
const { Search } = Input;
const { Column } = Table;
const fetchUsers = async () => {
  const { data } = await axios.get(
    "http://localhost:4000/Administration/Admin/GetAllTypeDishDrink"
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

  const API_URL_DELETE_TYPE_Dish =
  "http://localhost:4000/Administration/Admin/DeleteTypeDishDrink";

  const deleteTypeDish = async (ID) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ID),
      };
      const response = await fetch(API_URL_DELETE_TYPE_Dish, requestOptions);
      if (response.status === 200) {
        alert.show("Se elimino correctamente.");
        window.location.reload();
      } else {
        alert.show("Ocurrio un error al eliminar el tipo de platillo.");
      }
    } catch (error) {
      alert.show("Ocurrio un error al eliminar: " + error);
    }
  };


  return (
    <div>
      <AppBarLogged />
      <div className="title-page">
        <h1>Tipo Platillo</h1>
          </div>
      <div className="container-search">
      <Search className='search'
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <InsertTypeDish />
      </div>

      <br /> <br />
      <Table className='table'
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="tipo_Plato_Bebida_ID" key="tipo_Plato_Bebida_ID" />
        <Column title="Tipo" dataIndex="tipo_Plato_Bebida_Name" key="tipo_Plato_Bebida_Name" />
        <Column title="Descripcion" dataIndex="tipo_Plato_Bebida_Description" key="tipo_Plato_Bebida_Description" />
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <InsertTypeDish  
              id={record.tipo_Plato_Bebida_ID}
              />
            </Space>
          )}
        />
        <Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={() => deleteTypeDish(record.tipo_Plato_Bebida_ID)}>Eliminar</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
