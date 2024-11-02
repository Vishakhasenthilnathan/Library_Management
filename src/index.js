import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/system";
import theme from "./Theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </React.StrictMode>
    </BrowserRouter>
);
// ReactDOM.render(
//    <BrowserRouter>
//        <React.StrictMode>
//            <ThemeProvider theme={theme}>
//                <SnackbarProvider
//                    maxSnack={1}
//                    anchorOrigin={{
//                        vertical: "bottom",
//                        horizontal: "center",
//                    }}
//                    preventDuplicate
//                >
//                    <App/>
//                </SnackbarProvider>
//            </ThemeProvider>
//        </React.StrictMode>
//    </BrowserRouter>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
