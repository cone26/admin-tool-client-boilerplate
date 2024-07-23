import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Button, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";
import { createLabel, resources } from "../../constants/resource";

export const ShowComponent = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const userId = record?.id;

  const handleMenuItemClick = (resource: string) => {
    navigate(`/${resource}/show/${userId}`);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const formatValue = (value: any): any => {
    if (Array.isArray(value)) {
      return value
        .map((item) =>
          typeof item === "object" && item !== null
            ? `{ ${formatValue(item)} }`
            : item
        )
        .join(", ");
    }

    if (typeof value === "object" && value !== null) {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${formatValue(val)}`)
        .join(" | ");
    }

    return value === null || value === "" ? "null" : value;
  };

  return (
    <Box>
      <Show
        isLoading={isLoading}
        headerButtons={({ defaultButtons }) => <>{defaultButtons}</>}
      >
        <Stack gap={3}>
          {Object.entries(record || {}).map(([key, value]) => (
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {key.replace(/[-_](.)/g, (_, char) => char.toUpperCase())}
              </Typography>
              <TextField value={formatValue(value)} />
            </Box>
          ))}
        </Stack>
      </Show>
    </Box>
  );
};
