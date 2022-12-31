import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";


export default function PaginationTable(props) {
  return (
    <div>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={props.data}
        columns={props.columns}
        pagination={paginationFactory({ sizePerPage: 10 })}
      />
    </div>
  );
}
