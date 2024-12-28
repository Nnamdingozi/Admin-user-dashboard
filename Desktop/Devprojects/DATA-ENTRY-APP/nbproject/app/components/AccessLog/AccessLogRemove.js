import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { deleteAccessLog } from '../../api/accessLogApi';

function AccessLogRemove() {
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function removeLog() {
      await deleteAccessLog(id);
      history.push('/accesslog');
    }
    removeLog();
  }, [id, history]);

  return <div>Removing access log...</div>;
}

export default AccessLogRemove;
