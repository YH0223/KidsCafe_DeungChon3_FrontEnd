export async function customFetch(endpoint: string, options?: RequestInit) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    
    // 엔드포인트가 /로 시작하지 않으면 붙여주기
    const url = endpoint.startsWith('http') 
      ? endpoint 
      : `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  
    return response;
  }