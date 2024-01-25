// Importing React and external libs.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Importing component.
import EditForm from './EditForm';

// Importing style.
import './UserTable.css';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUserId, setDeletingUserId] = useState(null);

  /**
   * Fetches the data from an API.
   * @returns {void}
  **/
  const fetchData = async () => {
    try {
      const { data } = await axios.get('https://reqres.in/api/users?page');
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  /** 
   * Sets the value of current page.
   * @param pageNumber
   * @returns {void}
   * 
  **/

  /** 
   * Sets the value of current page using click event.
   * @param {pageNumber}
   * @returns {void}
  **/
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /** 
   * Sets the user to Edit.
   * @param {Object}
   * @return {void}
  **/
  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  /**
   * Updates the user.
   * @param {Object} 
   * @returns {void}
  **/
  const handleUpdate = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    setEditingUser(null);
  };

  /** 
   * Handles the cancel for Edit.
   * @returns {void}
  **/
  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  /**
   * Deletes the user by its ID.
   * @param {number} userId - The ID of the user to delete.
   * @returns {void}
   **/
  const handleDeleteClick = (userId) => {
    axios.delete(`https://reqres.in/api/users/${userId}`)
      .then(() => {
        const updatedUsers = [...users];
        const indexToDelete = updatedUsers.findIndex((user) => user.id === userId);
        if (indexToDelete !== -1) {
          updatedUsers.splice(indexToDelete, 1);
          setUsers(updatedUsers);
        }
        setDeletingUserId(null);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr style={{ borderBottom: '3px solid #dee2e6' }}>
            <th>Photo</th>
            <th>Id</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th style={{ textAlign: "center" }} colSpan={3}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr style={{ borderBottom: '3px solid #dee2e6' }} key={user.id}>
              <td><img src={user.avatar} alt={`Avatar of ${user.first_name}`} /></td>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <Link to={`/userdetails/${user.id}`}>
                  <button className="icon-button">
                    <FaSearch />
                  </button>
                </Link>
              </td>

              <td>
                <button className="icon-button" onClick={() => { handleEditClick(user); }}>
                  <FaEdit />
                </ button>

              </td>

              <td>
                <button className="icon-button" onClick={() => handleDeleteClick(user.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser ? (
        <EditForm user={editingUser} onSave={handleUpdate} onCancel={handleCancelEdit} />
      ) : null
      }
      <div className="pagination">
        {pageNumbers.map((number) => (
          <span
            key={number}
            onClick={() => handlePageClick(number)}
            className={currentPage === number ? 'active' : ''} >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
