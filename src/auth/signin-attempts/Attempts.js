const supabase = require("../../config/supabase");
async function logAttempt(email, req, status) {
  const ip_address = req.ip;
  const user_agent = req.headers["user-agent"];

  const logData = {
    ip_address,
    user_identifier: email,
    user_agent,
    status,
  };

  const { error } = await supabase.from("signin_attempts").insert(logData);
}
