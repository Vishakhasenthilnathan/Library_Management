import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/system";
import theme from "./Theme";
import {SnackbarProvider} from "notistack";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <SnackbarProvider>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
            </SnackbarProvider>
    </BrowserRouter>
);
