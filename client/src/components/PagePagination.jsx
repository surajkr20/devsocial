import React from "react";
import { Pagination } from "@mui/material";

const PagePagination = ({setPage, count}) => {

    const changePage = (event, value) =>{
        setPage(value)
    }

  return (
    <div className="flex items-center justify-center">
      <Pagination onChange={changePage}
        count={count}
        shape="rounded"
        color="primary"
        variant="outlined"
        sx={{
          "& .MuiPaginationItem-root": {
            color: "white",
            borderColor: "white",
          },
          "& .Mui-selected": {
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </div>
  );
};

export default PagePagination;
