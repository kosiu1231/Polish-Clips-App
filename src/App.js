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
import VerifyEmail from "./pages/VerifyEmail";
import { AuthProvider } from "./Contexts/AuthProvider";

function App() {
    return (
        <Router>
            <AuthProvider>
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
                            {/* Home */}
                            <Route path="/" element={<Home />} />
                            {/* Auth */}
                            <Route path="/rejestracja" element={<Register />} />
                            <Route
                                path="/weryfikacja"
                                element={<VerifyEmail />}
                            />
                            <Route path="/logowanie" element={<Login />} />
                            <Route
                                path="/zmianahasla"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/przypomnijhaslo"
                                element={<ForgotPassword />}
                            />
                            {/* Protected */}
                            <Route path="/dodaj" element={<Create />} />
                            {/* Others */}
                            <Route path="/klip/:id" element={<Clip />} />
                            <Route path="/gry" element={<Games />} />
                            {/* Error 404 */}
                            {/* <Route path="/404" element={<NotFound />} /> */}
                        </Routes>
                    </Container>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
