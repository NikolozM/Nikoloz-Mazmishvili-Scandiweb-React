import React from "react";
import Category from "./Category";

function Categories({ categories, chooseCategory }) {
  return (
    <div className="flex">
      {categories.map((category) => {
        return (
          <Category
            key={category.name}
            category={category}
            chooseCategory={chooseCategory}
            name={category.name}
          />
        );
      })}
    </div>
  );
}
export default Categories;
