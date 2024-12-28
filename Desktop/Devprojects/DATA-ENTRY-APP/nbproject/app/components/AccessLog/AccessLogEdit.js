import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getAccessLogById, updateAccessLog } from '../../api/accessLogApi';
import './AccessLogForm.css';

function AccessLogEdit() {
  const [formData, setFormData] = useState({
    user: '',
    accesstime: '',
    access_locate: '',
  });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const log = await getAccessLogById(id);
      setFormData(log);
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAccessLog(id, formData);
    history.push('/accesslog');
  };

  const handleCancel = () => {
    history.push('/accesslog');
  };

  return (
    <form className="accesslog-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="user">User</label>
        <input
          type="text"
          id="user"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="accesstime">Access Time</label>
        <input
          type="datetime-local"
          id="accesstime"
          name="accesstime"
          value={formData.accesstime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="access_locate">Access Location</label>
        <input
          type="text"
          id="access_locate"
          name="access_locate"
          value={formData.access_locate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default AccessLogEdit;
