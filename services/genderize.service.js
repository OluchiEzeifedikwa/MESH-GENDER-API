import axios from "axios";

export const fetchGenderPrediction = async (name) => {
  let data;

  try {
    const response = await axios.get("https://api.genderize.io", {
      params: { name },
      timeout: 5000,
    });
    data = response.data;
  } catch (err) {
    const error = new Error("Upstream API request failed");
    error.status = 502;
    throw error;
  }

  if (data.gender === null || data.count === 0) {
    return {
      httpStatus: 200,
      body: {
        status: "error",
        message: "No prediction available for the provided name",
      },
    };
  }

  const sample_size = data.count;
  const probability = data.probability;

  return {
    httpStatus: 200,
    body: {
      status: "success",
      data: {
        name: data.name,
        gender: data.gender,
        probability,
        sample_size,
        is_confident: probability >= 0.7 && sample_size >= 100,
        processed_at: new Date().toISOString(),
      },
    },
  };
};
