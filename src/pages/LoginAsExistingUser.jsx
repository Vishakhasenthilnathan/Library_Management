import {CircularProgress, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
// eslint-disable-next-line no-unused-vars
import {Box} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";

function LoginAsExistingUser() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function CircularProgressLoader() {
        return (
            <Box sx={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
                <CircularProgress/>
            </Box>
        );
    }

    const persistLogin = (username, phoneNumber, id) => {
        localStorage.setItem("username", username);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("id", id);
        //should persist token
    };

    // const login = async (formData) => {
    //     setIsLoading(true);
    //     const {name, phoneNumber} = formData;
    //     axios
    //         .post(
    //             `${config.endpoint}/library/login/user`, {name: name, phoneNumber: phoneNumber}
    //         )
    //         .then((response) => {
    //             if (response.data.success) {
    //                 setIsLoading(false);
    //                 const {name, phoneNumber, id} = response.data;
    //                 persistLogin(name, phoneNumber, id)
    //                 navigate('/');
    //             } else {
    //                 console.log(response.data.message);
    //                 setIsLoading(false);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setIsLoading(false);
    //         });
    // };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            minHeight="100vh"
        >
            <Box className="content">
                <Stack spacing={2} className="form">
                    <TextField id="name"
                               label="name"
                               variant="outlined"
                               title="name"
                               name="name"
                               placeholder="name"
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    <TextField id="phoneNumber"
                               variant="outlined"
                               label="phoneNumber"
                               name="phoneNumber"
                               type="phoneNumber"
                               fullWidth
                               value={phoneNumber}
                               placeholder="Enter a phoneNumber with minimum 6 characters"
                               onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <p>Don't have an account? <Link to="/register" className="link">Register now </Link></p>
                </Stack>
            </Box>
        </Box>
    );
}

export default LoginAsExistingUser;