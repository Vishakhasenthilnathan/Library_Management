import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { getUserBooks, returnBook } from '../services/BookService';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";

const UserActions = ({ books, onBorrow, updateBooksQuantity, enqueueSnackbar }) => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userAction, setUserAction] = useState("");

    useEffect(() => {
        if (userAction) {
            getBorrowedBooks();
        }
    }, [userAction]);

    const getBorrowedBooks = () => {
        getUserBooks(name, phoneNumber)
            .then(response => setBorrowedBooks(response.data))
            .catch(error => console.error(error));
    };

    const handleReturn = (bookId) => {
        returnBook(name, phoneNumber, bookId)
            .then(() => {
                const quantity = books.find(x => x.id === bookId).copiesAvailable ?? 0;
                setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
                updateBooksQuantity(bookId, quantity + 1);
            })
            .catch(e => enqueueSnackbar('Some technical error occurred. Please try again later.', { variant: 'error' }));
    };

    const handleActionChange = (e) => {
        setUserAction(e.target.value);
    };

    const renderBorrowedBooks = () => (
        <>
            <h2>Borrowed Books</h2>
            {borrowedBooks.length === 0 ? <p>No books borrowed by the user</p> : borrowedBooks.map(book => (
                <BookCard
                    key={book.id}
                    book={book}
                    onReturn={() => handleReturn(book.id)}
                    isBorrowed={true}
                    buttonAction={"Return"}
                />
            ))}
        </>
    );

    const renderBooksToBorrow = () => (
        <>
            <h2>Book to Borrow</h2>
            {books.filter(x => x.copiesAvailable > 0).map(book => (
                <BookCard
                    key={book.id}
                    book={book}
                    onBorrow={() => onBorrow(name, phoneNumber, book.id)}
                    isBorrowed={true}
                    buttonAction={"Borrow"}
                />
            ))}
        </>
    );

    return (
        <div>
            <Box>
                <h1>User Details</h1>
                <h3>To borrow (or) return books, please enter your details</h3>
                <Stack spacing={2} className="form">
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        title="Name"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        id="phoneNumber"
                        label="Mobile Number"
                        variant="outlined"
                        title="Mobile Number"
                        name="Mobile Number"
                        placeholder="Enter your Mobile number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select Action</FormLabel>
                        <RadioGroup row aria-label="action" name="action" value={userAction} onChange={handleActionChange}>
                            <FormControlLabel value="borrow" control={<Radio color="primary" />} label="Borrow" />
                            <FormControlLabel value="return" control={<Radio color="primary" />} label="Return borrowed books" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Box>
            {userAction === "return" && renderBorrowedBooks()}
            {userAction === "borrow" && renderBooksToBorrow()}
        </div>
    );
};

export default UserActions;