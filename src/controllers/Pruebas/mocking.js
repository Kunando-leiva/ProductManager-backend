const mockProducts = [];

for (let i = 1; i <= 100; i++) {
  const product = {
    _id: `product${i}`,
    title: `Product ${i}`,
    description: `Description of Product ${i}`,
    price: 10 + i, // Precio ficticio
    category: `Category ${i}`,
    stock: 100 - i, // Stock ficticio
  };

  mockProducts.push(product);
}

export default mockProducts;
