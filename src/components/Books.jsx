import React from 'react';
import BookCard from './BookCard';
import {Grid} from "@mui/material";

const BookList = ({books}) => {
    return (
        <div className="book-list" style={{textAlign: "left", margin: "5px"}}>
            <h1>Library Books</h1>
            <Grid container spacing={1} direction="row">
                {books.map(book => (
                    <Grid item xs={4}>
                        <BookCard
                            key={book.id}
                            book={book}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default BookList;
