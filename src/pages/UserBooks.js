// src/pages/MyBooks.js
import React from 'react';
import BorrowedList from '../components/BorrowedList';

const UserBooks = (action) => {
    return (
        <div>
            <BorrowedList/>
        </div>
    );
};

export default UserBooks;
