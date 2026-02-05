type RequestConfig = RequestInit & {
  token?: string | null;
};

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  let data;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = {};
  }

  if (!response.ok) {
    // Handle specific backend error formats
    if (data.detail && Array.isArray(data.detail)) {
      const errorMessages = data.detail
        .map((err: { msg: string }) => err.msg)
        .join(", ");
      throw new ApiError(errorMessages || "Validation error", response.status, data);
    }
    
    const message = data?.detail || data?.message || `Error: ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

// Get API base URL from environment
// In development, use empty string (Vite proxy handles routing)
// In production, use the VITE_API_BASE_URL
const API_BASE_URL = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_BASE_URL || "") 
  : "";

// Build full URL with base
function getFullUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}

export const apiClient = {
  get: async <T>(url: string, config: RequestConfig = {}): Promise<T> => {
    const headers = new Headers(config.headers);
    headers.set("Accept", "application/json");
    
    if (config.token) {
      headers.set("Authorization", `Bearer ${config.token}`);
    }

    const response = await fetch(getFullUrl(url), {
      ...config,
      method: "GET",
      headers,
    });

    return handleResponse<T>(response);
  },

  post: async <T>(url: string, body: unknown, config: RequestConfig = {}): Promise<T> => {
    const headers = new Headers(config.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");

    if (config.token) {
      headers.set("Authorization", `Bearer ${config.token}`);
    }

    const response = await fetch(getFullUrl(url), {
      ...config,
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  },
  
  // Streaming POST for chat responses
  streamPost: async <T = any>(
    url: string,
    body: unknown,
    onData: (data: T) => void,
    config: RequestConfig = {}
  ): Promise<any> => {
    const headers = new Headers(config.headers);
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "text/event-stream");

    if (config.token) {
      headers.set("Authorization", `Bearer ${config.token}`);
    }

    const response = await fetch(getFullUrl(url), {
      ...config,
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      // Try to parse error from response
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = {};
      }
      const message = errorData?.detail || errorData?.message || `Error: ${response.status}`;
      throw new ApiError(message, response.status, errorData);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("Response body is not readable");
    }

    let buffer = "";
    let finalData: any = null;

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        // Process any remaining buffer
        if (buffer.trim()) {
          try {
            // Try to parse remaining buffer as final structured data
            const parsed = JSON.parse(buffer);
            finalData = parsed;
          } catch {
            // If not JSON, treat as text chunk if it looks like one, or just ignore random trailing bytes
            if (buffer.trim().startsWith("{")) {
                 console.warn("Incomplete JSON in stream end:", buffer);
            }
          }
        }
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // Process complete lines (for SSE or line-delimited JSON)
      const lines = buffer.split("\n");
      buffer = lines.pop() || ""; // Keep incomplete line in buffer

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        // Handle Server-Sent Events format
        if (trimmedLine.startsWith("data: ")) {
          const dataStr = trimmedLine.substring(6);
          if (dataStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(dataStr);
            onData(parsed);

            // Keep track of what looks like final data for the return value
            // (though for complex streams, the caller usually relies on onData)
            if (parsed.data || parsed.type === "complete" || parsed.response) {
               finalData = parsed;
            }
          } catch {
            console.debug("Skipping non-JSON SSE data:", dataStr);
          }
        } else {
          // Try to parse as JSON (for line-delimited JSON streams)
          try {
            const parsed = JSON.parse(trimmedLine);
            onData(parsed);
             if (parsed.data || parsed.type === "complete" || parsed.response) {
               finalData = parsed;
            }
          } catch {
            // If not JSON, and NOT an SSE data line, it might be raw text or a keep-alive
            // For now, we only support JSON streams for this app to avoid noise.
            // If you need raw text support, add a fallback here.
          }
        }
      }
    }

    return finalData;
  },

  // Expose raw fetch for edge cases if needed, but typed
  request: async <T>(url: string, config: RequestConfig = {}): Promise<T> => {
     const response = await fetch(getFullUrl(url), config);
     return handleResponse<T>(response);
  }
};
