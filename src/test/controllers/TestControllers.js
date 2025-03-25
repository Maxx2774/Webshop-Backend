const supabase = require("../../config/supabase");

const categories = [
  { id: 1, name: "Frukt" },
  { id: 2, name: "Grönsaker" },
  { id: 3, name: "Mejeri" },
  { id: 4, name: "Kött & Fisk" },
  { id: 5, name: "Bröd & Bakverk" },
  { id: 6, name: "Drycker" },
  { id: 7, name: "Snacks & Godis" },
  { id: 8, name: "Torrvaror & Skafferi" },
  { id: 9, name: "Fryst" },
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
  } catch (error) {
    return res.sendStatus(500);
  }
}

module.exports = { addTestData, deleteData };
