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
                    mt: 1.5,
                }}
            >
                <Outlet />
            </Container>
        </main>
    );
};

export default Layout;
