// src/components/BorrowedList.js
import React, {useEffect, useState} from 'react';
import BookCard from './BookCard';
import {borrowBook, getAllBooks, getUserBooks, returnBook} from '../services/BookService';
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField} from "@mui/material";
import {Box} from "@mui/system";

const BorrowedList = ({existingBooks, onBorrow}) => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userAction, setUserAction] = useState("")

    useEffect(() => {
        getBorrowedBooks();
    }, [userAction]);
    const getBorrowedBooks = () => {
        getUserBooks(name, phoneNumber)
            .then(response => setBorrowedBooks(response.data))
            .catch(error => console.error(error));
    }

    const handleReturn = (bookId) => {
        console.log(bookId)
        returnBook(name, phoneNumber, bookId)
            .then(() => {
                setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId));
            })
            .catch(error => alert('Unable to return book. ',error));
    };



    const onActionChange = e => {
        setUserAction(e.target.value)
        console.log(e.target.value)
    }
    return (
        <div>
            <Box>
                <h1>User Details</h1>
                <h3>To borrow (or) return books, please enter your details</h3>
                <Stack spacing={2} className="form">
                    <TextField id="name"
                               label="Name"
                               variant="outlined"
                               title="Name"
                               name="name"
                               placeholder="Enter your name"
                               value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    <TextField id="phoneNumber"
                               label="Mobile Number"
                               variant="outlined"
                               title="Mobile Number"
                               name="Mobile Number"
                               placeholder="Enter your Mobile number"
                               value={phoneNumber}
                               onChange={(e) => setPhoneNumber(e.target.value)}/>

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select Action</FormLabel>
                        <RadioGroup row aria-label="action" name="action" value={userAction} onChange={onActionChange}>
                            <FormControlLabel value="borrow" control={<Radio color="primary"/>} label="Borrow"/>
                            <FormControlLabel value="view" defaultChecked control={<Radio color="primary"/>}
                                              label="View"/>
                        </RadioGroup>
                    </FormControl>

                    {userAction !== "" ?
                        <div style={{textAlign: "center", fontWeight: "bold"}}>
                            <Button variant="outlined" size="small" onClick={getBorrowedBooks}>
                                <b> {userAction === "borrow" ? "CHECK BORROWED BOOKS" : "CHECK BOOKS TO RETURN"} </b>
                            </Button>
                        </div> : null}
                </Stack>
            </Box>
            {userAction === "view" &&
                <>
                    <h2>Borrowed Books</h2>
                    {borrowedBooks.length === 0 && <p>No books borrowed by the user</p>}
                    {borrowedBooks.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onReturn={() => handleReturn(book.id)}
                            isBorrowed={true}
                            buttonAction={"Return"}
                        />
                    ))}
                </>
            }
            {userAction === "borrow" &&
                <>
                    <h2>Book to Borrow</h2>
                    {existingBooks.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onBorrow={() => onBorrow(name,phoneNumber,book.id)}
                            isBorrowed={true}
                            buttonAction={"Borrow"}
                        />
                    ))}
                </>
            }
        </div>
    );
};

export default BorrowedList;
