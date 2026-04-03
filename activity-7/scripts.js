console.log("\n=== Activity 7: Product Catalog Application ===");

console.log("\n=== PRODUCT DATA STRUCTURE ===");

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality noise-cancelling wireless headphones with 30-hour battery life.",
    price: 199.99,
    category: "electronics",
    image: "https://picsum.photos/seed/headphones/300/200",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    description:
      "Comfortable 100% organic cotton t-shirt available in multiple colors.",
    price: 29.99,
    category: "clothing",
    image: "https://picsum.photos/seed/tshirt/300/200",
  },
  {
    id: 3,
    name: "JavaScript Programming Guide",
    description:
      "Comprehensive guide to modern JavaScript programming techniques and best practices.",
    price: 45.0,
    category: "books",
    image: "https://picsum.photos/seed/jsbook/300/200",
  },
  {
    id: 4,
    name: "Smart Home Security Camera",
    description:
      "WiFi-enabled security camera with night vision and mobile app integration.",
    price: 129.99,
    category: "electronics",
    image: "https://picsum.photos/seed/camera/300/200",
  },
  {
    id: 5,
    name: "Running Shoes",
    description:
      "Lightweight running shoes with advanced cushioning technology.",
    price: 89.99,
    category: "clothing",
    image: "https://picsum.photos/seed/shoes/300/200",
  },
];

console.log("\n=== PRODUCT DISPLAY FUNCTIONS ===");

let appState = {
  displayedProducts: [...products],
  filters: {
    search: "",
    category: "all",
  },
};

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-product-id", product.id);

  card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <span class="product-category">${product.category}</span>
        </div>
    `;

  return card;
}

function displayProducts(productsToShow) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = "";

  if (productsToShow.length === 0) {
    productGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <h3>No products found</h3>
                <p>Try adjusting your search or filters.</p>
            </div>
        `;
    return;
  }

  productsToShow.forEach((product) => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });

  updateResultsCount(productsToShow.length);
  console.log(`Displayed ${productsToShow.length} products`);
}

function updateResultsCount(count) {
  const totalProducts = products.length;
  const resultsCount = document.getElementById("resultsCount");

  if (count === totalProducts) {
    resultsCount.textContent = `Showing all ${totalProducts} products`;
  } else {
    resultsCount.textContent = `Showing ${count} of ${totalProducts} products`;
  }
}

function searchProducts(searchTerm) {
  const term = searchTerm.toLowerCase().trim();

  if (term === "") {
    return products;
  }

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term),
  );
}

function filterByCategory(products, category) {
  if (category === "all") {
    return products;
  }

  return products.filter((product) => product.category === category);
}

function applyFilters() {
  console.log("Applying filters:", appState.filters);

  let filteredProducts = searchProducts(appState.filters.search);
  filteredProducts = filterByCategory(
    filteredProducts,
    appState.filters.category,
  );

  appState.displayedProducts = filteredProducts;
  displayProducts(filteredProducts);
}

function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  appState.filters.search = searchInput.value;
  applyFilters();
}

function handleCategoryFilter() {
  const categoryFilter = document.getElementById("categoryFilter");
  appState.filters.category = categoryFilter.value;
  applyFilters();
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("categoryFilter").value = "all";

  appState.filters = {
    search: "",
    category: "all",
  };
  applyFilters();
}

function init() {
  console.log("Initializing Product Catalog application...");

  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);
  document
    .getElementById("categoryFilter")
    .addEventListener("change", handleCategoryFilter);
  document
    .getElementById("clearFiltersBtn")
    .addEventListener("click", clearFilters);

  displayProducts(products);

  console.log("Product Catalog application initialized successfully!");
  console.log("Try searching and filtering products!");
}

init();
