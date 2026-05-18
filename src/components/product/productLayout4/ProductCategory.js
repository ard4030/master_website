import React from 'react';

const ProductCategory = ({ categories }) => {
  if (!categories?.length) return null;

  return (
    <div className="text-sm danaMed text-gray-600 mt-1">
      <span>دسته‌بندی: </span>
      {categories.map((cat, i) => (
        <span key={cat._id || i} className="text-blue-500 cursor-pointer hover:underline ml-1">
          {cat.name}
          {i < categories.length - 1 && <span className="text-gray-400 mx-1">،</span>}
        </span>
      ))}
    </div>
  );
};

export default ProductCategory;
