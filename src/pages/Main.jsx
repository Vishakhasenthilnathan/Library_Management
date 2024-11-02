import logo from '../library.png';
import {Grid} from "@mui/material";
// eslint-disable-next-line no-unused-vars
import {App} from "../styles/App.css";
import Books from "../components/Books";
import React, {useEffect, useState} from "react";
import BorrowedList from "../components/BorrowedList";
import {borrowBook, getAllBooks} from "../services/BookService";

function Main() {
    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        getAllBooks()
            .then(response => {
                    console.log(response.data);
                    setBooks(response.data)
                }
            )
            .catch(error => console.error(error));
    },[refresh]);

    const handleBorrow = (name, phoneNumber,bookId) => {
        borrowBook(name, phoneNumber, bookId)
            .then(() => {
                setBooks(books.map(book =>
                    book.id === bookId ? {...book, copies: book.copies - 1} : book
                ));
                setRefresh(true);
            })
            .catch(error => alert('Borrow limit reached or book unavailable.'));
    };

    return (
        <div className="App">
            <Grid container spacing={1} direction="row">
                <Grid item xs={8}>
                    <img src={logo} className="App-logo" alt="logo" style={{padding: "5px", height: "150px" }}/>
                    <Books existingBooks={books} />
                </Grid>
                <Grid item xs={4}>
                    <BorrowedList existingBooks={books} onBorrow={handleBorrow}/>
                </Grid>
            </Grid>
            {/*</div>*/}

        </div>
    );
}

export default Main;