import React, { useEffect, useState, useTransition } from 'react';
import UserList from '../../components/Users/UserList';
import { UserType } from '../../typings';
import './Home.css';

function Home() {
  const [isPending, startTransition] = useTransition();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUserIndex, setSelectedUserIndex] = useState<number>(-1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setUserList(data);
    }
    fetchData();
  }, []);

  function showSelectedUser(index: number): void {
    if (index === selectedUserIndex) {
      setSelectedUserIndex(-1);
      return;
    }
    setSelectedUserIndex(index);
  }
  function updateSearchTermHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    startTransition(() => {
      setSearchTerm(event.target.value);
    });
  }

  function filterUsers(searchTerm: string): Array<UserType> {
    if (!searchTerm) {
      return userList;
    }
    return userList.filter(
      (user: UserType) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }

  const filteredUsers = filterUsers(searchTerm);
  return (
    <div className='main-container'>
      <div className='font-bold p-10'>Users list</div>
      <div className='search-box'>
        <input
          type='text'
          className='input'
          placeholder='Search by user name or email...'
          onChange={updateSearchTermHandler}
        />
      </div>
      {isPending && <p>Loading...</p>}
      <UserList
        filteredUsers={filteredUsers}
        showSelectedUser={showSelectedUser}
        selectedUserIndex={selectedUserIndex}
      />
    </div>
  );
}

export default Home;
