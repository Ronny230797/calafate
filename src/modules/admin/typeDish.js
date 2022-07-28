import React, { useState } from "react";
import { Table, Input, Space, Tag } from "antd";
import axios from "axios";
import { userColumns } from "../../components/columns";
import { useTableSearch } from "../../components/useTableSearch";
import InsertTypeDish from "../admin/InsertTypeDish";

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

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchUsers
  });

  return (
    <div>
      <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        style={{ position: "sticky", top: "0", left: "0" }}
      />
      <InsertTypeDish />
      </div>

      <br /> <br />
      <Table
        dataSource={filteredData}
        pagination={false}
      >
        <Column title="Id" dataIndex="tipo_Plato_Bebida_ID" key="tipo_Plato_Bebida_ID" />
        <Column title="Tipo" dataIndex="tipo_Plato_Bebida_Name" key="tipo_Plato_Bebida_Name" />
        <Column title="Descripcion" dataIndex="tipo_Plato_Bebida_Description" key="tipo_Plato_Bebida_Description" />
        <Column title="Modificar" key="modificar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={()=>alert(`${record.tipo_Plato_Bebida_ID}`)}>Modificar {record.tipo_Plato_Bebida_Name}</a>
            </Space>
          )}
        />
        <Column title="Eliminar" key="eliminar"
          render={(_, record) => (
            <Space size="middle">
              <a onClick={()=>alert('eliminar')}>Eliminar {record.tipo_Plato_Bebida_Name}</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
