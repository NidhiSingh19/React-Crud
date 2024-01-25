// Importing React and external libs.
import React, { useState } from 'react';

// Importing styles.
import './EditForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/** 
  * Edits the user 
  * @param {Object} user - which has to be edited.
  * @param {OnSave}
  * @param {onCancel}
  * @returns {void}
**/
const EditForm = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedUser);
  };
  const handleCancel = () => {
    onCancel(editedUser);
  }

  return (
    <div className="edit-form">
      <h3 className="title">Edit User</h3>
      <form>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input type="text" className="form-content" name="first_name" value={editedUser.first_name} onChange={handleInputChange}
          />
        </div><br />
        <div className="form-group">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text" className="form-content" name="last_name" value={editedUser.last_name} onChange={handleInputChange}
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button className="btn btn-outline-success" onClick={handleSave}>
            Update
          </button>
          <button className="btn btn-outline-danger" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;