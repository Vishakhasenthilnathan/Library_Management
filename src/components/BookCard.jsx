// src/components/BookCard.js
import React from 'react';
import {Button, Card, CardContent, Typography} from "@mui/material";

const BookCard = ({book, buttonAction, onReturn, onBorrow}) => {
    return (
        <Card sx={{maxWidth: 345}} style={{padding: "5px", margin: "5px"}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Genre - {book.genre}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Author - {book.author}
                </Typography>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    Copies Available - {book.copiesAvailable}
                </Typography>
                {buttonAction === "Return" && (
                    <Button size="small" onClick={onReturn}>{buttonAction}</Button>
                )}
                {buttonAction === "Borrow" && (
                    <Button size="small" onClick={onBorrow}>{buttonAction}</Button>
                )}
            </CardContent>
        </Card>
    );
};

export default BookCard;
