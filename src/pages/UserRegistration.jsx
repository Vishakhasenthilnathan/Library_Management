import {Button, CircularProgress, Stack, TextField} from "@mui/material";
import {Box} from "@mui/system";
import axios from "axios";
import {useSnackbar} from "notistack";
import React, {useState} from "react";
import {config} from "../App";
import Footer from "./Footer";
import "./Register.css";
import {Link, useHistory} from "react-router-dom";


const Register = () => {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const [username, setUserName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let history = useHistory();

    function CircularProgressLoader() {
        return (
            <Box sx={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
                <CircularProgress/>
            </Box>
        );
    }

    const validateAndRegister = () => {
        const formData = {
            username: username,
            mobileNumber: mobileNumber,
        }
        const isValid = validateInput(formData);
        if (isValid) {
            register(formData);
        }
    }

    const register = async (formData) => {
        setIsLoading(true);
        const {username, password} = formData;
        axios
            .post(
                `${config.endpoint}/auth/register`, {username: username, password: password}
            )
            .then((response) => {
                if (response.status === 201) {
                    enqueueSnackbar("Registered Successfully", {variant: "success"});
                    setIsLoading(false);
                    setInterval(() => closeSnackbar(), 10000);
                    history.push("/login")
                }
            })
            .catch((error) => {
                if (error.response != null) {
                    enqueueSnackbar(error.response.data.message, {variant: "error"});
                    setInterval(() => closeSnackbar(), 2000);
                } else {
                    enqueueSnackbar("Error occurred", {variant: "error"});
                    setInterval(() => closeSnackbar(), 3000);
                }
                setIsLoading(false);
            });
    };

    const validateInput = (data) => {
        var error = "";

        if (data.username === "" || data.username == null) {
            error = "Username is a required field";
        } else if (data.username.length < 6) {
            error = "Username must be at least 6 characters";
        } else if (data.password === "") {
            error = "Password is a required field";
        } else if (data.password.length < 6) {
            error = "Password must be at least 6 characters";
        } else if (data.password !== data.confirmPassword) {
            error = "Passwords do not match";
        }

        if (error !== "") {
            enqueueSnackbar(error, {variant: "error"});
            setInterval(() => closeSnackbar(), 10000);
            return false;
        }
        return true;
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            minHeight="100vh"
        >
            <Box className="content">
                <Stack spacing={2} className="form">
                    <h2 className="title">Register</h2>
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        title="Username"
                        name="username"
                        placeholder="Enter Username"
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        id="phoneNumber"
                        variant="outlined"
                        label="Mobile Number"
                        name="mobileNumber"
                        type="number"
                        helperText="mobileNumber must be atleast 6 characters length"
                        fullWidth
                        placeholder="Enter a mobileNumber with minimum 6 characters"
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    {!isLoading && (
                        <Button className="button" variant="contained" onClick={validateAndRegister}>
                            Register Now
                        </Button>
                    )}
                    {isLoading && (
                        <CircularProgressLoader/>
                    )}
                    <p className="secondary-action">
                        Already have an account?{" "}
                        <Link to="/login" className="link">
                            Login here
                        </Link>
                    </p>
                </Stack>
            </Box>
            <Footer/>
        </Box>
    );
};

export default Register;