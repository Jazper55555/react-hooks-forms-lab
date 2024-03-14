import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterItems, setFilterItems] = useState('All')
  const [newItems, setNewItems] = useState([])

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  
  function handleFilterItems(event) {
    setFilterItems(event.target.value)
  }

  function itemFormSubmit(newItem) {  
    setNewItems([...newItems, newItem]) 
  }

  const itemsToDisplay = [...items, ...newItems].filter((item) => {
    if (selectedCategory && filterItems === "All") return true;
    if (selectedCategory === 'All') {
      return item.name.toLowerCase().includes(filterItems.toLowerCase())
    }
    return (item.category === selectedCategory && item.name.toLowerCase().includes(filterItems.toLowerCase()))
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={itemFormSubmit}/>
      <Filter onSearchChange={handleFilterItems} onCategoryChange={handleCategoryChange}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
