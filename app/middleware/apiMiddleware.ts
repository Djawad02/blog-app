export const fetcher = async (url: string, options: RequestInit = {}) => {
    try {
      const res = await fetch(url, options);
      
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }
  
      return await res.json(); 
    } catch (error) {
      console.error("API request error:", error);
      throw error; 
    }
  };

  //For Authors
export const getAuthorById = async (authorId: number) => {
return await fetcher(`/api/users/${authorId}`);
};


//For blogs
export const getBlogById = async (id: string) => {
    return await fetcher(`/api/blogs/${id}`);
};

// utils/apiMiddleware.ts

export const fetchBlogsWithLimit = async (page: number, limit: number) => {
  try {
    const response = await fetch(`/api/blogs?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error; 
  }
};

