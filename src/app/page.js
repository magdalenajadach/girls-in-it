"use client"

import React, { useEffect, useState } from 'react';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // const url = 'https://api.webz.io/newsApiLite';
        // const token = '';
        // const query = encodeURIComponent(`("women" OR "girls") AND ("success" OR "achievement" OR "victory") AND ("sports" OR "soccer" OR "basketball" OR "tennis" OR "athletics")`);
        
        const response = await fetch(`https://api.webz.io/newsApiLite?token=${apiKey}&q=women&&q=sport`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setArticles(data.posts); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Women's Success in Sports</h1>
      {error && <p>Error: {error}</p>}
      {articles.length > 0 ? (
        <div>
          {articles.map((article, index) => (
            <div key={index} className='border-4 border-black border-solid m-2 p-4'>
              <h2>{article.thread.title}</h2>
              <p>Source: {article.thread.site}</p>
              <p>Published: {new Date(article.thread.published).toLocaleDateString()}</p>
              <a href={article.thread.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading articles...</p>
      )}
    </div>
  );

}


