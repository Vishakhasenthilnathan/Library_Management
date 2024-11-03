import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import logo from '../library.png';
import BookList from "../components/BookList";
import UserActions from "../components/UserActions";
import { borrowBook, getAllBooks } from "../services/BookService";
import {App} from "../styles/App.css";

function Library() {
    const { enqueueSnackbar } = useSnackbar();
    const [books, setBooks] = useState([]);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, [isReload]);

    const fetchBooks = () => {
        getAllBooks()
            .then(response => setBooks(response.data))
            .catch(error => console.error(error));
    };

    const updateBooksQuantity = (bookId, booksQuantity) => {
        setBooks(books.map(book =>
            book.id === bookId ? { ...book, copiesAvailable: booksQuantity } : book
        ));
    };

    const handleBorrow = (name, phoneNumber, bookId) => {
        if (!name || !phoneNumber) {
            enqueueSnackbar('Please enter your name and phone number.', { variant: 'error' });
            return;
        }

        borrowBook(name, phoneNumber, bookId)
            .then(response => {
                if (response.status === 200) {
                    enqueueSnackbar('Book borrowed successfully.', { variant: 'success' });
                    updateBooksQuantity(bookId, books.find(book => book.id === bookId).copiesAvailable - 1);
                    setIsReload(true);
                } else {
                    enqueueSnackbar(response.data, { variant: 'error' });
                }
            })
            .catch(error => enqueueSnackbar(error.response.data, { variant: 'error' }));
    };

    return (
        <div className="App">
            <Grid container spacing={1} direction="row">
                <Grid item xs={8}>
                    <img src={logo} className="App-logo" alt="logo" style={{ padding: "5px", height: "150px" }} />
                    <BookList books={books} />
                </Grid>
                <Grid item xs={4}>
                    <UserActions
                        books={books}
                        onBorrow={handleBorrow}
                        updateBooksQuantity={updateBooksQuantity}
                        enqueueSnackbar={enqueueSnackbar}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default Library;