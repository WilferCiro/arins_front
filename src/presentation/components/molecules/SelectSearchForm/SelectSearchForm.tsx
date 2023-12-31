import { Box, LoadingOverlay, Select } from "@mantine/core";
import { useState } from "react";
import { useQuery } from "react-query";
import React from "react";
import { getSearchSelectData } from "@/data/services/select.services";

interface Props {
  onChange: (data: any) => void;
  endpoint: string;
  value: any;
}

const SelectSearchForm = React.forwardRef(
  ({ onChange, value, endpoint, ...props }: Props, ref: any) => {
    const [searchValue, onSearchChange] = useState("");

    const { data, isLoading } = useQuery(
      [`${endpoint}_select_search`, { endpoint, searchValue }],
      () =>
        getSearchSelectData<{ label: string; value: string }>({
          endpoint,
          search: searchValue,
        }),
      {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
    );
    return (
      <Box pos="relative">
        <LoadingOverlay
          visible={isLoading}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Select
          {...props}
          ref={ref}
          searchable
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          onChange={onChange}
          clearable
          value={value}
          data={data || []}
        />
      </Box>
    );
  }
);

SelectSearchForm.displayName = "SelectSearchForm";

export default SelectSearchForm;
