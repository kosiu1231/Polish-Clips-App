import React from "react";
import ClipsList from "../components/ClipsList";
import { Box, Grid } from "@mui/material";

function Home() {
    // const [query, setQuery] = useState([]);

    return (
        <Grid container spacing={2}>
            <Grid item lg={12} xl={3}>
                <Box>
                    test test test test test test test test test test test test
                    test test test test test
                </Box>
            </Grid>
            <Grid item lg={12} xl={9}>
                <ClipsList />
            </Grid>
        </Grid>
    );
}

export default Home;
