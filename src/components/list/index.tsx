import React from "react";

import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { List, ShowButton, useDataGrid } from "@refinedev/mui";

export const ListComponent = () => {
  const { dataGridProps } = useDataGrid({});

  const data = dataGridProps.rows;

  const columns = React.useMemo((): any => {
    if (!data || data.length === 0) return [];

    const keys = Object.keys(data[0]);

    const dynamicColumns = keys
      .filter((key) => {
        const value = data[0][key];
        return (
          typeof value !== "object" &&
          key !== "createdAt" &&
          key !== "updatedAt"
        );
      }) // 객체인 필드를 제외
      .map((key) => ({
        field: key,
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        minWidth: 50,
        flex: 1,
      }));

    return [
      ...dynamicColumns,
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: (row: any) => (
          <Box>
            {/*<EditButton hideText recordItemId={row.id} accessControl={{ enabled: false, hideIfUnauthorized: false }} />*/}
            <ShowButton hideText recordItemId={row.id} />
            {/*<DeleteButton hideText recordItemId={row.id} />*/}
          </Box>
        ),
        align: "center",
        headerAlign: "center",
        minWidth: 150,
      },
    ];
  }, [data]);

  return (
    <List>
      <Box>
        <DataGrid {...dataGridProps} columns={columns} autoHeight />
      </Box>
    </List>
  );
};
