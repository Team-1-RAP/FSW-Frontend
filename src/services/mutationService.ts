export interface IMutationAmount {
  income: number;
  spending: number;
}

export const fetchMutationAmounts = async (
  token: string,
  noAccount: number
): Promise<IMutationAmount[]> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL +
        `api/v1/mutations/${noAccount}/amounts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch mutation amount");
    }

    const data = await response.json();

    if (data.status) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to fetch mutation amount");
    }
  } catch (error) {
    console.error("Fetch mutations amount error:", error);
    throw error;
  }
};
