// Importing React and external libs.
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importing userParams.
import { useParams } from 'react-router-dom';

// Importing style.
import './UserDetails.css';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  /**
    * Fetches the User by its ID to display.
    * @returns {void}
  **/
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const {data} = await axios.get(`https://reqres.in/api/users/${userId}`);
        setUser(data.data);
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <p>Fecthing...</p>;
  }
  return (
    <div>
      <h2>User Information</h2>
      <div className='user-details'>
      <p><img className="display-image" src={user.avatar} alt={`Image  of ${user.first_name}`} /><br />
      <strong><em>Id:</em></strong> {user.id}<br />
      <strong><em>Name:</em></strong> {user.first_name} {user.last_name}<br />
      <strong><em>Email:</em></strong> {user.email}</p>
      </div>
    </div>
  );
};

export default UserDetails;
