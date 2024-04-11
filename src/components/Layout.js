import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    return (
        <main className="App">
            <Navbar />
            <Container
                maxWidth="xxl"
                sx={{
                    height: "calc(100vh - 80px)",
                    mt: { xs: 19, md: 10 },
                }}
            >
                <Outlet />
            </Container>
        </main>
    );
};

export default Layout;
