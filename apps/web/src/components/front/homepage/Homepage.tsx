import { Box } from "@mui/material";
import PageHeader from "../utility/PageHeader";
import React from "react";
import SearchTextField from "../utility/SearchTextField";

function Homepage() {
  return (
    <Box>
      <PageHeader headerText={"Dobrodošli na Pogledaj!"} />
      <SearchTextField
        id={"search-all"}
        label={"Pronađi bioskop ili filmski naslov"}
      />
      <Box>
        {[...new Array(20)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
          )
          .join('\n')}
      </Box>
    </Box>
  );
}

export default Homepage;