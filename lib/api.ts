let BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://skilltestnextjs.evidam.zybotechlab.com";

if (BASE_URL.startsWith("http://") && !BASE_URL.includes("localhost")) {
  BASE_URL = BASE_URL.replace("http://", "https://");
}


export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  if (!BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL is not defined. Set NEXT_PUBLIC_API_BASE_URL in your environment (Vercel Environment Variables) to your backend API base URL (https://...)."
    );
  }

  const baseUrl = BASE_URL.endsWith("/") ? BASE_URL.slice(0, -1) : BASE_URL;
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${normalizedEndpoint}`;
  console.log(`Fetching: ${url}`, options);

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error: ${res.status} ${res.statusText}`, errorText);

      let errorMessage = `API Error: ${res.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
      } catch (e) {
        if (errorText.length < 100) errorMessage = errorText;
      }

      throw new Error(errorMessage);
    }

    return res.json();
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    throw err;
  }
};

