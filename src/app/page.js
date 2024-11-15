"use client";

import React, { useEffect, useState } from "react";

import { fetchMediaData } from "../api/webzApiCall"
export default function Home() {


  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMediaData = async () => {
      try {
        const data = await fetchMediaData();
        setArticles(data);
      } catch (error) {
        setError("Failed to load articles. Please try again later.");
      }
    };

    getMediaData(); // Trigger data fetching on component mount
  }, []);

  return (
    <div>
      <h1>Women&apos;s Success in Sports</h1>
      {error && <p>Error: {error}</p>}
      {articles.length > 0 ? (
        <div>
          {articles.map((article, index) => (
            <div key={index} className="border-4 border-black border-solid m-2 p-4">
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
