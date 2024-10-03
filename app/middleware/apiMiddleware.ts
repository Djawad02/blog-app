import { CategoryData } from "../interfaces/Categorydata";

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

export const getPostsByAuthorId = async (authorId: number) => {
  try {
    const response = await fetch(`/api/blogs?authorId=${authorId}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Error fetching posts by author ID:", error);
    throw error; 
  }
}


//For categories
export const getCategories = async () => {
  return await fetcher('/api/categories/');
};


export const AddNewCategory = async (categoryData:CategoryData) => {
  return await fetcher('/api/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  });
};

export const DeleteCategory = async (id:number) => {
  return await fetcher(`/api/categories/${id}`, {
    method: 'DELETE',
  });
};

export const UpdateCategory = async (id: number, data: { name: string }) => {
  return await fetcher(`/api/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};