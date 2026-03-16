type RequestOptions = {
  baseUrl?: string;
};

const defaultOptions: RequestOptions = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
};

export const requestClient = {
  async post<TResponse>(path: string, body: unknown, options: RequestOptions = {}) {
    const baseUrl = options.baseUrl ?? defaultOptions.baseUrl ?? '';
    const res = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || `Request failed with status ${res.status}`);
    }

    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
      return (await res.json()) as TResponse;
    }
    return (undefined as unknown) as TResponse;
  },
};

