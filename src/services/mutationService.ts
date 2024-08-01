export interface IMutationAmount {
  income: number;
  spending: number;
}

export interface IMutation {
  date: string;
  amount: number;
  transactionType: string;
  recipientTargetAccount: string;
  transactionStatus: string;
  mutationType: string;
  recipientName: string;
  type: string;
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

export const fetchMutations = async (
  token: string,
  noAccount: string,
  month: number,
  page?: number,
  size?: number,
  type?: string
): Promise<IMutation[]> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL +
        `api/v1/mutations/${noAccount}?month=${month}&type=${type}&page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch mutations");
    }

    const data = await response.json();

    if (data.status) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to fetch mutations");
    }
  } catch (error) {
    console.error("Fetch mutations error:", error);
    throw error;
  }
};

export const fetchSeparateMutations = async (
  token: string,
  noAccount: string,
  month: number,
  size: number
): Promise<IMutation[]> => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_BASE_URL +
        `api/v1/mutations/${noAccount}?month=${month}&size=${size}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch mutations");
    }

    const data = await response.json();

    if (data.status) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to fetch mutations");
    }
  } catch (error) {
    console.error("Fetch mutations error:", error);
    throw error;
  }
};
