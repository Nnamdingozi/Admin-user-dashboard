import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAccessLogById } from '../../api/accessLogApi';
import './AccessLogView.css';

function AccessLogView() {
  const [log, setLog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const result = await getAccessLogById(id);
      setLog(result);
    }
    fetchData();
  }, [id]);

  if (!log) {
    return <div>Loading...</div>;
  }

  return (
    <div className="accesslog-view">
      <h2>Access Log Details</h2>
      <p>User: {log.user}</p>
      <p>Access Time: {log.accesstime}</p>
      <p>Access Location: {log.access_locate}</p>
      <Link to="/accesslog">Back to List</Link>
    </div>
  );
}

export default AccessLogView;
