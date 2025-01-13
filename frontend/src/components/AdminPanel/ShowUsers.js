import React from "react";
import { useState } from 'react';
import UserDetails from "./UserDetails";

const ShowUsers = ({ users, setUsers }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const handleCloseDetails = () => {
        setSelectedUser(null);
    };

    const handleDeleteUser = (userId) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        setSelectedUser(null);
    };


    return (
        <div>
            {selectedUser ? (
                <UserDetails user={selectedUser} onClose={handleCloseDetails} onDelete={handleDeleteUser} />
            ) : (
                users.map((user) => (
                    <button key={user._id} onClick={() => handleSelectUser(user)}>
                        {user.nazwa}, {user.email}
                    </button>
                ))
            )}
        </div>
    );
};

export default ShowUsers;