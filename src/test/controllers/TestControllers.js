const supabase = require("../../config/supabase");

// Categories data (kept for reference, but not inserted by addTestData)
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

// Products data - Updated with user's provided data
const products = [
  {
    name: "Äpple Royal Gala",
    price: 25,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07311042016953_C1C0_s01",
    description:
      "Krispiga, söta Royal Gala äpplen med röd-gul färg. Perfekta som snacks eller i desserter.",
    category_id: 1,
    stock_quantity: 30,
  },
  {
    name: "Banan Ekologisk",
    price: 22,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07311042002482_C1N1_s03",
    description:
      "KRAV-märkta ekologiska bananer med söt smak. Odlade utan bekämpningsmedel.",
    category_id: 1,
    stock_quantity: 50,
  },
  {
    name: "Tomat Kvist",
    price: 29,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07311042002215_C1N0_s01",
    description:
      "Saftiga röda kvisttomater med intensiv smak. Odlade i Sverige under sommarhalvåret.",
    category_id: 2,
    stock_quantity: 40,
  },
  {
    name: "Arla Mellanmjölk",
    price: 15,
    weight: 1,
    weight_unit: "liter",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310865075192_C1L1_s05",
    description:
      "Ekologisk mellanmjölk med 1,5% fetthalt. Från svenska gårdar med fokus på djurvälfärd.",
    category_id: 3,
    stock_quantity: 60,
  },
  {
    name: "Bregott Normalsaltat",
    price: 45,
    weight: 500,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07311870010932_C1L1_s01",
    description:
      "Svenskt smör och rapsolja i perfekt kombination. Bra konsistens direkt från kylen.",
    category_id: 3,
    stock_quantity: 25,
  },
  {
    name: "Nötfärs Svensk",
    price: 89,
    weight: 500,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07340045504167_C1L1_s03",
    description:
      "Färsk nötfärs från svenska gårdar med 10% fetthalt. Perfekt till köttfärssås och hamburgare.",
    category_id: 4,
    stock_quantity: 20,
  },

  {
    name: "Baguette Surdeg",
    price: 20,
    weight: 250,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07340083480829_C1N1_s02",
    description:
      "Krispig fransk surdegsbaguette med luftig inkråm. Bakat i stenugn för bästa resultat.",
    category_id: 5,
    stock_quantity: 35,
  },
  {
    name: "Tropicana Apelsinjuice",
    price: 30,
    weight: 1,
    weight_unit: "liter",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/05410188031836_C1R1_s01",
    description:
      "100% pressad juice från solmogna apelsiner utan tillsatser. Rik på C-vitamin.",
    category_id: 6,
    stock_quantity: 50,
  },

  {
    name: "Barilla Spaghetti",
    price: 25,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/08076804215058_C1N1_s03",
    description:
      "Traditionell italiensk pasta av durumvete. Perfekt al dente-konsistens efter 9 minuters kokning.",
    category_id: 8,
    stock_quantity: 80,
  },
  {
    name: "GB Gräddglass Vanilj",
    price: 49,
    weight: 1,
    weight_unit: "liter",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/08711327462342_C1N1_s01",
    description:
      "Krämig gräddglass med äkta vanilj. Tillverkad av svensk grädde med hög fetthalt.",
    category_id: 9,
    stock_quantity: 25,
  },

  {
    name: "Marabou Mjölkchoklad",
    price: 25,
    weight: 200,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07622201727390_C1N1_s01",
    description:
      "Krämig svensk mjölkchoklad med hög kakohalt. Smälter perfekt i munnen.",
    category_id: 7,
    stock_quantity: 35,
  },
  {
    name: "Ben's Långkornigt Ris",
    price: 39,
    weight: 1,
    weight_unit: "kg",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/05410673005847_C1C1_s01",
    description:
      "Aromatiskt långkornigt ris som håller sig luftigt och löskokt. Perfekt till grytor och curries.",
    category_id: 8,
    stock_quantity: 60,
  },
  {
    name: "Felix Fryst Pytt i Panna",
    price: 49,
    weight: 400,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310240075489_C1N1_s04",
    description:
      "Klassisk svensk pytt i panna med tärnad potatis, lök och nötkött. Snabb och enkel middag.",
    category_id: 9,
    stock_quantity: 30,
  },
  {
    name: "Findus Frysta Broccoli",
    price: 18,
    weight: 500,
    weight_unit: "g",
    image_url:
      "https://assets.axfood.se/image/upload/f_auto,t_500/07310500187006_C1N1_s01",
    description:
      "Djupfrysta broccolibuketter som behåller sin näringsrika kvalitet. Snabbt tillagade och redo på minuter.",
    category_id: 9,
    stock_quantity: 40,
  },
];

// Function to add only products
async function addTestData(_, res) {
  try {
    // Remove the categories insertion part
    // const { error: categoriesError } = await supabase
    //   .from("categories")
    //   .insert(categories);

    // Only insert products
    const { error: productsError } = await supabase
      .from("products")
      .insert(products);

    // Adjust error handling and response
    if (productsError) {
      // Log the specific error for debugging
      console.error("Error inserting products:", productsError);
      return res.status(400).json({ error: productsError.message }); // Send error message
    }
    // Send success status if only products were inserted successfully
    return res.status(200).json({ message: "Products added successfully" }); // Send a success message
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

// Function to delete data (with caution notes)
async function deleteData(_, res) {
  try {
    // Be cautious with deleting products if they are referenced by order_items
    // You might need to handle order_items deletion first or set ON DELETE behavior in the DB
    const { error: productsError } = await supabase
      .from("products")
      .delete()
      .neq("id", 0);

    // Keep categories deletion if needed, but be aware of dependencies
    const { error: categoriesError } = await supabase
      .from("categories")
      .delete()
      .neq("id", 0);

    if (productsError || categoriesError) {
      // Provide more specific error feedback
      const errorMessage =
        productsError?.message ||
        categoriesError?.message ||
        "Unknown error during deletion";
      console.error("Deletion error:", errorMessage);
      return res.status(400).json({
        error: errorMessage,
      });
    }
    return res.sendStatus(204); // No content on successful deletion
  } catch (error) {
    console.error("Server error during deletion:", error); // Log server errors
    return res.sendStatus(500);
  }
}

module.exports = {
  addTestData,
  deleteData,
};
