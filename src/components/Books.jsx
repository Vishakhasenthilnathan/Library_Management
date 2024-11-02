// src/components/BookList.js
import React, {useEffect, useState} from 'react';
import BookCard from './BookCard';
import {borrowBook, getAllBooks} from '../services/BookService';
import {Grid} from "@mui/material";

const BookList = ({existingBooks}) => {


    return (
        <div className="book-list" style={{textAlign: "left", margin: "5px"}}>
            <h1>Library Books</h1>
            <Grid container spacing={1} direction="row">
                {existingBooks.map(book => (
                    <Grid item xs={4}>
                        <BookCard
                            key={book.id}
                            book={book}
                            isBorrowed={false}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default BookList;
