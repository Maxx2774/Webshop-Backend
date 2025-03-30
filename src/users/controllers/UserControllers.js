const supabase = require("../../config/supabase");

async function getUsers(_, res) {
  try {
    // Allt i Users tabellen hämtas förutom lösenordet
    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fel vid hämtning av användare:", error);
      return res.status(500).json({
        error: "Ett tekniskt fel uppstod. Vänligen försök igen senare.",
      });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Oväntat fel vid hämtning av användare:", error);
    return res.status(500).json({
      error: "Något gick fel på vår server. Vi ber om ursäkt för besväret.",
    });
  }
}

module.exports = {
  getUsers,
};
