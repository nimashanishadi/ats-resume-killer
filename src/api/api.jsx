import axios from "axios";

export const sendUserData = async (data) => {
  try {
    const response = await axios.post("http://localhost:8080/api/scan", data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Success:", response.data);
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
