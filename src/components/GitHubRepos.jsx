import { useEffect, useState } from 'react';

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCancelled = false;

    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/xingzhi0317/repos');
        if (!response.ok) {
          throw new Error(`Unable to load GitHub repositories (status ${response.status}).`);
        }
        const data = await response.json();
        if (!isCancelled) setRepos(data);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchRepos();
    return () => { isCancelled = true; };
  }, []);

  return (
    <section className="github-repos" aria-labelledby="github-heading">
      <div className="container">
        <h2 id="github-heading">My GitHub Repositories</h2>
        {loading ? <p role="status">Loading GitHub repositories...</p> :
          error ? <p role="alert">{error}</p> :
            repos.length === 0 ? <p>No public repositories yet.</p> : (
              <ul>
                {repos.map(repo => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
      </div>
    </section>
  );
};

export default GitHubRepos;
