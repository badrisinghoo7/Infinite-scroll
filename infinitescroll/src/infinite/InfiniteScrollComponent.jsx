import React, { useState, useEffect } from "react";

const InfiniteScrollComponent = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMoreData();
    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  const fetchMoreData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products?page=${page}`
      );
      const newData = await response.json();
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <h1>Infinite Scroll Example</h1>
      <div
        style={{
          border: "2px dashed black",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "strech !important",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px dashed green",
              marginTop: "20px",
              width: "400px",
              marginRight: "10px",
            }}
          >
            <h3>{item.title}</h3>
            <h4>{item.price}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScrollComponent;
