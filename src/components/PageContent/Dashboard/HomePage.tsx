"use client";

import { Button } from "@chakra-ui/react";
import { DataGrid, DataGridPagination } from "@saas-ui/pro";
import React from "react";

export default function HomePage() {
  return (
    <DataGrid
      isHoverable
      isSelectable
      isSortable
      columns={[
        { id: "name", header: "Name" },
        { id: "role", header: "Role" },
        {
          id: "actions",
          cell: () => <Button>Edit</Button>,
        },
      ]}
      data={[{ name: "Renata Alink", role: "Founder" }]}
    >
      <DataGridPagination />
    </DataGrid>
  );
}
