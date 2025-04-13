const supabase = require("../../config/supabase");

const categories = [
  { id: 1, name: "Frukt", slug: "frukt" },
  { id: 2, name: "Grönsaker", slug: "gronsaker" },
  { id: 3, name: "Mejeri", slug: "mejeri" },
  { id: 4, name: "Kött & Fisk", slug: "kott&fisk" },
  { id: 5, name: "Bröd & Bakverk", slug: "brod&bakverk" },
  { id: 6, name: "Drycker", slug: "drycker" },
  { id: 7, name: "Snacks & Godis", slug: "snacks&godis" },
  { id: 8, name: "Torrvaror & Skafferi", slug: "torrvaror&skafferi" },
  { id: 9, name: "Fryst", slug: "fryst" },
];
const products = [
  {
    name: "Äpple",
    price: 25,
    weight: null,
    weight_unit: "kg",
    image_url: "https://example.com/apple.jpg",
    description: "Rött äpple",
    category_id: 1,
    stock_quantity: 30,
  },
  {
    name: "Banan",
    price: 22,
    weight: null,
    weight_unit: "kg",
    image_url: "https://example.com/banana.jpg",
    description: "Gula, mogna bananer",
    category_id: 1,
    stock_quantity: 50,
  },
  {
    name: "Tomat",
    price: 29,
    weight: null,
    weight_unit: "kg",
    image_url: "https://example.com/tomato.jpg",
    description: "Saftiga röda tomater",
    category_id: 2,
    stock_quantity: 40,
  },
  {
    name: "Mjölk",
    price: 15,
    weight: 1,
    weight_unit: "liter",
    image_url: "https://example.com/milk.jpg",
    description: "Ekologisk mellanmjölk 1L",
    category_id: 3,
    stock_quantity: 60,
  },
  {
    name: "Smör",
    price: 45,
    weight: 500,
    weight_unit: "g",
    image_url: "https://example.com/butter.jpg",
    description: "Äkta smör 500g",
    category_id: 3,
    stock_quantity: 25,
  },
  {
    name: "Nötfärs",
    price: 89,
    weight: 500,
    weight_unit: "g",
    image_url: "https://example.com/minced-meat.jpg",
    description: "Svensk nötfärs 500g",
    category_id: 4,
    stock_quantity: 20,
  },
  {
    name: "Laxfilé",
    price: 199,
    weight: 1,
    weight_unit: "kg",
    image_url: "https://example.com/salmon.jpg",
    description: "Färsk norsk laxfilé",
    category_id: 4,
    stock_quantity: 15,
  },
  {
    name: "Baguette",
    price: 20,
    weight: 250,
    weight_unit: "g",
    image_url: "https://example.com/baguette.jpg",
    description: "Krispig fransk baguette",
    category_id: 5,
    stock_quantity: 35,
  },
  {
    name: "Apelsinjuice",
    price: 30,
    weight: 1,
    weight_unit: "liter",
    image_url: "https://example.com/orange-juice.jpg",
    description: "Färskpressad apelsinjuice 1L",
    category_id: 6,
    stock_quantity: 50,
  },
  {
    name: "Chips",
    price: 35,
    weight: 200,
    weight_unit: "g",
    image_url: "https://example.com/chips.jpg",
    description: "Saltade potatischips 200g",
    category_id: 7,
    stock_quantity: 40,
  },
  {
    name: "Pasta",
    price: 25,
    weight: 500,
    weight_unit: "g",
    image_url: "https://example.com/pasta.jpg",
    description: "Italiensk pasta 500g",
    category_id: 8,
    stock_quantity: 80,
  },
  {
    name: "Glass",
    price: 49,
    weight: 1,
    weight_unit: "liter",
    image_url: "https://example.com/ice-cream.jpg",
    description: "Vaniljglass 1L",
    category_id: 9,
    stock_quantity: 25,
  },
];

async function addTestData(_, res) {
  try {
    const { error: categoriesError } = await supabase
      .from("categories")
      .insert(categories);
    const { error: productsError } = await supabase
      .from("products")
      .insert(products);

    if (categoriesError || productsError) {
      return res.status(400).json({ error: categoriesError || productsError });
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function deleteData(_, res) {
  try {
    const { error: productsError } = await supabase
      .from("products")
      .delete()
      .neq("id", 0);
    const { error: categoriesError } = await supabase
      .from("categories")
      .delete()
      .neq("id", 0);

    if (productsError || categoriesError) {
      return res.status(400).json({
        error: productsError.message || categoriesError.message,
      });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(500);
  }
}
function generateTestProducts(count = 500) {
  const productTypes = [
    "Äpple",
    "Banan",
    "Tomat",
    "Mjölk",
    "Smör",
    "Nötfärs",
    "Laxfilé",
    "Baguette",
    "Juice",
    "Chips",
    "Pasta",
    "Glass",
    "Yoghurt",
    "Ost",
    "Choklad",
    "Kaffe",
    "Te",
    "Ris",
    "Bönor",
    "Korv",
    "Kyckling",
  ];

  const adjectives = [
    "Ekologisk",
    "Premium",
    "Klassisk",
    "Färsk",
    "Lokalproducerad",
    "Importerad",
    "Prisvärd",
    "Gourmet",
    "Vegansk",
    "Glutenfri",
    "Laktosfri",
  ];

  const testProducts = [];

  for (let i = 1; i <= count; i++) {
    // Pick random values for product attributes
    const productType =
      productTypes[Math.floor(Math.random() * productTypes.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const category_id = Math.floor(Math.random() * 9) + 1; // Categories 1-9
    const price = Math.floor(Math.random() * 500) + 10; // Random price between 10-510
    const stock = Math.floor(Math.random() * 100) + 1; // Random stock between 1-100

    // Create weight info based on product type
    let weight = null;
    let weight_unit = "kg";

    if (Math.random() > 0.3) {
      // 70% chance to have weight
      if (["Mjölk", "Juice"].includes(productType)) {
        weight = 1;
        weight_unit = "liter";
      } else if (["Smör", "Ost", "Pasta"].includes(productType)) {
        weight = [250, 500, 750, 1000][Math.floor(Math.random() * 4)];
        weight_unit = "g";
      } else {
        weight = (Math.random() * 2).toFixed(1);
      }
    }

    testProducts.push({
      name: `TEST_${adjective} ${productType} ${i}`, // Adding TEST_ prefix for easy identification
      price: price,
      weight: weight,
      weight_unit: weight_unit,
      image_url: `https://example.com/test-${i}.jpg`,
      description: `Test produkt ${i}: ${adjective} ${productType}`,
      category_id: category_id,
      stock_quantity: stock,
      is_test: true, // Optional flag to identify test products
    });
  }

  return testProducts;
}

async function addBulkTestData(req, res) {
  try {
    const count = req.query.count ? parseInt(req.query.count) : 500;
    const testProducts = generateTestProducts(count);

    // Insert in batches of 100 to avoid exceeding request limits
    const batchSize = 100;
    let successCount = 0;
    let errors = [];

    for (let i = 0; i < testProducts.length; i += batchSize) {
      const batch = testProducts.slice(i, i + batchSize);
      const { data, error } = await supabase.from("products").insert(batch);

      if (error) {
        errors.push(error);
      } else {
        successCount += batch.length;
      }
    }

    if (errors.length) {
      return res.status(207).json({
        message: `Added ${successCount} of ${count} test products`,
        errors: errors,
      });
    }

    return res.status(200).json({
      message: `Successfully added ${successCount} test products`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to add bulk test data",
      details: error.message,
    });
  }
}

async function removeBulkTestData(req, res) {
  try {
    // Remove products that have the TEST_ prefix in their names
    const { data, error } = await supabase
      .from("products")
      .delete()
      .like("name", "TEST\\_%");

    if (error) {
      return res.status(400).json({
        error: "Failed to remove test products",
        details: error.message,
      });
    }

    return res.status(200).json({
      message: `Successfully removed test products`,
      count: data?.length || "unknown",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Failed to remove test data",
      details: error.message,
    });
  }
}

// Update the module.exports
module.exports = {
  addTestData,
  deleteData,
  addBulkTestData,
  removeBulkTestData,
};
