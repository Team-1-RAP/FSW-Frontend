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

export interface IMutationResponse {
  currentPage: number;
  totalPage: number;
  size: number;
  totalItem: number;
  pagingData: IMutation[];
}

export interface IMutationAmount {
  income: number;
  spending: number;
}

export const fetchMutations = async (
  token: string,
  noAccount: string,
  month: number,
  page: number,
  size?: number,
  type?: string
): Promise<IMutationResponse> => {
  try {
    const url = new URL(
      import.meta.env.VITE_API_BASE_URL +
        `api/v1/mutations/${noAccount}?month=${month}`
    );

    if (page) {
      url.searchParams.append("page", page.toString());
    }

    if (size) {
      url.searchParams.append("size", size.toString());
    }

    if (type) {
      url.searchParams.append("type", type.toString());
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch mutations");
    }

    const data = await response.json();

    if (data.status) {
      return data.data as IMutationResponse;
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
      return data.data.pagingData;
    } else {
      throw new Error(data.message || "Failed to fetch mutations");
    }
  } catch (error) {
    console.error("Fetch mutations error:", error);
    throw error;
  }
};

export const fetchMutationAmounts = async (
  token: string,
  noAccount: string
): Promise<IMutationAmount> => {
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
      return data.data as IMutationAmount;
    } else {
      throw new Error(data.message || "Failed to fetch mutation amount");
    }
  } catch (error) {
    console.error("Fetch mutations amount error:", error);
    throw error;
  }
};
