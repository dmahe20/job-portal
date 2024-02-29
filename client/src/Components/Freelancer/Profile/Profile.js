import React, { useState } from 'react';
import axios from 'axios';

function GitHubProfile(props) {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
      props.setSignupDetails({
        ...props.signupDetails,
        ["gitProfileId"]: e.target.value,
      });
  };

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setRepositories(response.data);
      setError(null);
    } catch (error) {
      setError('User not found or repositories could not be fetched.');
      setRepositories([]);
    }
  };

  return (
    <div>
      <h2>GitHub Profile</h2>
      <input
        type="text"
        placeholder="Enter your GitHub username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={fetchRepositories}>Fetch Repositories</button>
      {error && <p>{error}</p>}
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GitHubProfile;
