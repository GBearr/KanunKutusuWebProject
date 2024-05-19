import axios from "axios";

const API_URL = "http://localhost:3000/proposals";

export const fetchLawProposals = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("API Response:", response.data); // Yanıtı konsola yazdır
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
