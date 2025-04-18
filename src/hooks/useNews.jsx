const useNews = () => {
  const API_KEY = "XXX";
  const COUNTRY = "us";
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const newsUrl = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&apiKey=${API_KEY}`;
    try {
      const res = await axios.get(newsUrl);
      console.log(res.data);

      setNews(res.data);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error);
    }
  };
  return { news, loading, error };
};

export default useNews;
