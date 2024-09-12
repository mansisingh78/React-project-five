import { useEffect, useState } from "react";

const FetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch product data from API on component mount
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={product.thumbnail}
                  alt={product.title}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {product.description.substring(0, 60)}...
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No products found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchProducts;
