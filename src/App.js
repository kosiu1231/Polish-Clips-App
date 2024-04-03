import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Clip from "./pages/Clip";
// import Clips from "./pages/Clips";
import ForgotPassword from "./pages/ForgotPassword";
import Games from "./pages/Games";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Create from "./pages/Create";
import { Box, Container } from "@mui/material";
import ConfirmPassword from "./pages/ConfirmPassword";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Box sx={{ pt: 10 }} />
                <Container
                    maxWidth="xxl"
                    sx={{
                        height: "calc(100vh - 80px)",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/clip/:id" element={<Clip />} />
                        <Route
                            path="/forgotpassword"
                            element={<ForgotPassword />}
                        />
                        <Route path="/games" element={<Games />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/confirmpassword"
                            element={<ConfirmPassword />}
                        />
                        <Route
                            path="/resetpassword"
                            element={<ResetPassword />}
                        />
                        <Route path="/create" element={<Create />} />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
}

export default App;
