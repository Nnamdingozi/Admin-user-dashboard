import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAccessLogs } from '../../api/accessLogApi';
import './AccessLogList.css';

function AccessLogList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getAccessLogs();
      setLogs(result);
    }
    fetchData();
  }, []);

  return (
    <div className="accesslog-list">
      <h2>Access Logs</h2>
      <Link to="/accesslog/new">Add New Log</Link>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.user} - {log.accesstime} - {log.access_locate}
            <Link to={`/accesslog/view/${log.id}`}>View</Link>
            <Link to={`/accesslog/edit/${log.id}`}>Edit</Link>
            <Link to={`/accesslog/remove/${log.id}`}>Remove</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccessLogList;
