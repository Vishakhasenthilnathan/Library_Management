import logo from '../library.png';
import {Grid} from "@mui/material";
import {App} from "../styles/App.css";
import BookList from "../components/Books";
import React, {useEffect, useState} from "react";
import BorrowedList from "../components/BorrowedList";
import {borrowBook, getAllBooks} from "../services/BookService";
import {useSnackbar} from "notistack";

function Library() {
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        console.log("useEffect");
        getAllBooks()
            .then(response => {
                    setBooks(response.data)
                }
            )
            .catch(error => console.error(error));
    }, [refresh]);

    const updateBooksQuantity = (bookId, booksQuantity) => {
        console.log("updateBooks Quantity", bookId, booksQuantity);
        setBooks(books.map(book =>
            book.id === bookId ? {...book, copiesAvailable: booksQuantity} : book
        ));
    };

     const handleBorrow = (name, phoneNumber, bookId) => {
        if (name === "" || phoneNumber === "") {
            enqueueSnackbar('Please enter your name and phone number.', {variant: 'error'});
            return;
        }
        borrowBook(name, phoneNumber, bookId)
            .then((response) => {
                if(response.status === 200){
                    enqueueSnackbar('Book borrowed successfully.', {variant: 'success'});
                    setBooks(books.map(book =>
                        book.id === bookId ? {...book, copiesAvailable: book.copiesAvailable - 1} : book
                    ));
                    console.log("borrowed book", bookId);
                    console.log("books", books);
                    setRefresh(true);
                }
                else if(response.status === 409){
                    enqueueSnackbar('Book already borrowed.', {variant: 'error'});
                }
                else{
                    enqueueSnackbar('Borrow limit reached or book unavailable.', {variant: 'error'});
                }
            })
            .catch(error => alert('Borrow limit reached or book unavailable.'));
    };

    return (
        <div className="App">
            <Grid container spacing={1} direction="row">
                <Grid item xs={8}>
                    <img src={logo} className="App-logo" alt="logo" style={{padding: "5px", height: "150px"}}/>
                    <BookList books={books}/>
                </Grid>
                <Grid item xs={4}>
                    <BorrowedList existingBooks={books} onBorrow={handleBorrow} updateBooksQuantity={(bookId, booksQuantity)=>updateBooksQuantity(bookId,booksQuantity)}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Library;