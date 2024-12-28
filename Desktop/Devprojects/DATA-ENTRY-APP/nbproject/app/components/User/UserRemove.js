import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteUser } from '../../api/userApi';

function UserRemove() {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function removeUser() {
      await deleteUser(id);
      history.push('/');
    }
    removeUser();
  }, [id, history]);

  return <div>Removing user...</div>;
}

export default UserRemove;
