import axios from "axios";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { NEWS_API_KEY } from "@env";

const useNews = (query) => {
  const API_KEY = NEWS_API_KEY;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchNews = debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setArticles([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const encodedQuery = encodeURIComponent(searchQuery.trim());
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${encodedQuery}&apiKey=${API_KEY}&language=en&sortBy=publishedAt`
        );
        // console.log("response in usenews:", response);
        
        setArticles(response.data.articles || []);
      } catch (err) {
        console.error("News API error:", err.response?.data || err.message);

        setError(
          err.response?.data?.message || err.message || "Failed to fetch news"
        );
      } finally {
        setLoading(false);
      }
    }, 500);

    fetchNews(query);

    // Cleanup: Cancel debounce on unmount or query change
    return () => {
      fetchNews.cancel();
    };
  }, [query]);

  return { articles, loading, error };
};

export default useNews;
