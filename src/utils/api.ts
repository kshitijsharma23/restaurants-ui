import { ApiEndpoints, BASE_API_URL } from "../constants/apiConstants";
import { Restaurant } from "../types";

export const searchRestaurants = async (query: string) => {
  try {
    const res = await fetch(`${BASE_API_URL}/${ApiEndpoints.SEARCH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: query,
      }),
    });
    const results = (await res.json()) as Restaurant[];
    return results;
  } catch (error) {
    console.error(error);
  }
};
