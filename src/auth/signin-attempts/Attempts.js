const supabase = require("../../config/supabase");
const axios = require("axios");
async function logAttempt(payload) {
  const response = await axios.get(
    `http://ip-api.com/json/${payload.ip_address}`
  );
  const geo = response.data;
  const logData = {
    ip_address: payload.ip_address,
    user_identifier: payload.email,
    user_agent: payload.user_agent,
    status: payload.status,
    failure_reason: payload.failure_reason,
    user_id: payload.user_id,
  };

  const { data, error } = await supabase
    .from("signin_attempts")
    .insert(logData)
    .select("id")
    .single();

  console.log(data, error);

  const geoData = {
    attempt_id: data.id,
    country: geo.country,
    region_name: geo.regionName,
    city: geo.city,
    zip: geo.zip,
    lat: geo.lat,
    lon: geo.lon,
    timezone: geo.timezone,
    isp: geo.isp,
    org: geo.org,
    as_number: geo.as,
  };
  const { error: error2 } = await supabase
    .from("signin_attempts_geolocation")
    .insert(geoData);
}

module.exports = { logAttempt };
