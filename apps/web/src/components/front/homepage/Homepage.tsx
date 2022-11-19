import { Box } from "@mui/material";
import PageHeader from "../utility/PageHeader";
import React from "react";
import SearchTextField from "../utility/SearchTextField";
import PageSubHeader from "../utility/PageSubHeader";
import {LocalFireDepartmentOutlined, LocationOnOutlined} from "@mui/icons-material";

function Homepage() {
  return (
    <Box>
      <PageHeader headerText={"Dobrodošli na Pogledaj!"} />
      <Box mb={'20px'}>
        <SearchTextField
          id={"search-all"}
          placeholder={"Pronađi bioskop ili filmski naslov"}
        />
      </Box>
      <PageSubHeader
        headerText={"Ne propusti ove filmove"}
        Icon={LocalFireDepartmentOutlined}
      />
      <PageSubHeader
        headerText={"Bioskopi u tvojoj blizini"}
        Icon={LocationOnOutlined}
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