import axios from "axios";
import BASEURL from "./baseURL";

/**
 * Helper that builds the full URL safely (avoid double slash).
 */
const buildURL = (base, endpoint) => {
  if (!endpoint) return base;
  return `${base.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;
};

const commonAPI = async (method, endpoint, data = null) => {
  try {
    const response = await axios({
      method,
      url: buildURL(BASEURL, endpoint),
      data,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export default commonAPI;
