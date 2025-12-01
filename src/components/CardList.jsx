import Card from "./Card";
import Button from "./Button";
import React, { useState, useEffect } from "react";
import Search from "./Search";

const limit = 10;
const CardList = ({data}) => {
  const defaultDataset = data.slice(0, limit);

  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [filteredData, setFilteredData] = useState(data);
  const [products, setProducts] = useState(filteredData.slice(0, limit));


  // Define the handlePrevious function
  const handlePrevious = () => {
    // set the offset to the previous 10 products
    setOffset(offset - 10);
  }

  // Define the handleNext function
  const handleNext = () => {
    // set the offset to the next 10 products
    setOffset(offset + 10);
  }
  const handlePageChange = (delta) => {
    const newOffset = offset + delta;
    if (newOffset < 0 || newOffset >= filteredData.length) return;
    setOffset(newOffset);
  };

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);

  const filterTags = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(data); // Reset to full list when search is cleared
      setOffset(0);
      return;
    }

    const filteredList = data.filter(
      (product) =>
        product.tags &&
        Array.isArray(product.tags) &&
        product.tags.some(
          (tag) =>
            typeof tag.title === "string" &&
            tag.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    setFilteredData(filteredList);
    setOffset(0); // Reset pagination after filtering
  };

  return (

    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">   
      <Button
          text="Previous"
          handleClick={() => handlePageChange(-limit)}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePageChange(limit)}
          disabled={offset + limit >= filteredData.length}
        />
      </div>
    </div>
  )
}

export default CardList;
