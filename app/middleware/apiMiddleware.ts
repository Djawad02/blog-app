import { CategoryData } from "../interfaces/Categorydata";
import { TagData } from "../interfaces/TagData";
import { UserData } from "../interfaces/UserData";

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

export async function fetchUserIdByUsername(username: string): Promise<number | null> {
  try {
    const response = await fetch("/api/users/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user ID");
    }

    const data = await response.json();
    return data.id ?? null;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }
}

//for registering new authors/users
export const AddUser = async (userData:UserData) => {
 return  await fetcher('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

};

//For blogs
export const getBlogs = async() =>{
  return await fetcher('/api/blogs/');
}

export const getBlogById = async (id: string) => {
  return await fetcher(`/api/blogs/${id}`);
};

export const searchBlogsByTitle = async (title: string) => {
  const encodedTitle = encodeURIComponent(title);
  return await fetcher(`/api/blogs/search?title=${encodedTitle}`);
};

export const UpdateBlog = async (id: number, data: {authorId: number, title: string, content: string, imagePath: string }) => {
  return await fetcher(`/api/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const DeleteBlog = async (id:number) => {
  return await fetcher(`/api/blogs/${id}`, {
    method: 'DELETE',
  });
};

export const fetchBlogsWithLimit = async (
  page: number,
  limit: number,
  category?: string,
  tag?: string
) => {
  try {
    let query = `/api/blogs?page=${page}&limit=${limit}`;
    if (category) query += `&category=${category}`;
    if (tag) query += `&tag=${tag}`;

    const response = await fetch(query);
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

export const AddNewBlog = async (blogData:BlogData) => {
  return await fetcher('/api/blogs', {
    method: 'POST',
    body: JSON.stringify(blogData),
  });
};


export const fetchCategoriesForBlog = async(blogid:string)=>{
  return await fetcher(`/api/blogs_categories/${blogid}`);
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

//For Tags
export const getTags = async () => {
  return await fetcher('/api/tags/');
};

export const fetchTagsForBlog = async(blogid:string)=>{
  return await fetcher(`/api/blogs_tags/${blogid}`);
}

export const AddNewTag = async (tagData:TagData) => {
  return await fetcher('/api/tags', {
    method: 'POST',
    body: JSON.stringify(tagData),
  });
};

export const DeleteTag = async (id:number) => {
  return await fetcher(`/api/tags/${id}`, {
    method: 'DELETE',
  });
};

export const UpdateTag = async (id: number, data: { name: string }) => {
  return await fetcher(`/api/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};


//managing many to many of blogs_categories
export const removeCategoryFromBlog = async (id: number, data: { categoryId: number }) => {
  return await fetch(`/api/blogs_categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data), 
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to remove category');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error removing category:', error);
      throw error;
    });
};


export const addCategoryToBlog = async (blogId: number, categoryId: number) => {
  return await fetcher("/api/blogs_categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blogId,
      categoryId,
    }),
  });
};

//managing many to many of blogs_tags
export const removeTagFromBlog = async (id: number, data: { tagId: number }) => {
  return await fetch(`/api/blogs_tags/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(data), 
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to remove tag');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error removing tag:', error);
      throw error;
    });
};


export const addtagToBlog = async (blogId: number, tagId: number) => {
  return await fetcher("/api/blogs_tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blogId,
      tagId,
    }),
  });
};