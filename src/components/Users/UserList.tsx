import React from 'react';
import { UserType } from '../../typings';
import './UserList.css';

interface Props {
  filteredUsers: UserType[];
  showSelectedUser(index: number): void;
  selectedUserIndex: number;
}

function UserList({
  filteredUsers,
  showSelectedUser,
  selectedUserIndex,
}: Props) {
  return (
    <div className='container'>
      {filteredUsers.map((user: UserType, index: number) => (
        <div
          key={index}
          onClick={() => {
            showSelectedUser(index);
          }}
        >
          <div className='user-list'>
            <span className='index'>{index + 1}. </span>
            <div className='user'>
              <p className='name'>{user?.name} </p>
              <p className='username'>@{user?.username} </p>
            </div>
          </div>
          {selectedUserIndex === index && (
            <div className='user-details'>
              <div className='user-field'>
                <p className='user-field-name'>EMAIL:</p>
                <p className='user-field-value'>{user?.email}</p>
              </div>
              <div className='user-field'>
                <p className='user-field-name'>PHONE:</p>
                <p className='user-field-value'>{user?.phone}</p>
              </div>
              <div className='user-field'>
                <p className='user-field-name'>WEBSITE:</p>
                <p className='user-field-value user-website '>
                  {user?.website}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserList;
