import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Photo data for each category
export const getPhotosForCategory = (categoryId: string) => {
  const photosByCategory: Record<string, any[]> = {
    'baby-days': [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
        caption: "Sweet dreams and gentle moments",
        date: "March 15, 2024",
        age: "6 months"
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
        caption: "Curious eyes discovering the world",
        date: "March 10, 2024",
        age: "6 months"
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
        caption: "Peaceful afternoon nap time",
        date: "March 5, 2024",
        age: "6 months"
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
        caption: "First smiles and giggles",
        date: "February 28, 2024",
        age: "5 months"
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop",
        caption: "Starry night dreams",
        date: "February 20, 2024",
        age: "5 months"
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
        caption: "Nature walks and fresh air",
        date: "February 15, 2024",
        age: "5 months"
      }
    ],
    'toddler-adventures': [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
        caption: "First steps adventure",
        date: "June 15, 2024",
        age: "14 months"
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
        caption: "Playground exploration",
        date: "June 10, 2024",
        age: "14 months"
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
        caption: "Learning to walk",
        date: "June 5, 2024",
        age: "13 months"
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop",
        caption: "Bedtime stories",
        date: "May 30, 2024",
        age: "13 months"
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
        caption: "Playing with toys",
        date: "May 25, 2024",
        age: "13 months"
      }
    ],
    'little-explorer': [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
        caption: "Garden adventures",
        date: "September 15, 2024",
        age: "3 years"
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
        caption: "Nature walks and discoveries",
        date: "September 10, 2024",
        age: "3 years"
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
        caption: "Butterfly watching",
        date: "September 5, 2024",
        age: "3 years"
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
        caption: "Beach day fun",
        date: "August 30, 2024",
        age: "3 years"
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop",
        caption: "Stargazing night",
        date: "August 25, 2024",
        age: "3 years"
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
        caption: "Building sandcastles",
        date: "August 20, 2024",
        age: "3 years"
      }
    ],
    'school-days': [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
        caption: "First day of school",
        date: "January 15, 2025",
        age: "5 years"
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
        caption: "Learning to read",
        date: "January 10, 2025",
        age: "5 years"
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
        caption: "Art class masterpiece",
        date: "January 5, 2025",
        age: "5 years"
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
        caption: "Making new friends",
        date: "December 30, 2024",
        age: "5 years"
      }
    ],
    'special-occasions': [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop",
        caption: "5th Birthday celebration",
        date: "December 15, 2024",
        age: "5 years"
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
        caption: "Christmas morning joy",
        date: "December 25, 2024",
        age: "5 years"
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
        caption: "Easter egg hunt",
        date: "April 20, 2024",
        age: "4 years"
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
        caption: "Halloween costume fun",
        date: "October 31, 2024",
        age: "4 years"
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
        caption: "Family vacation memories",
        date: "July 15, 2024",
        age: "4 years"
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
        caption: "Graduation day",
        date: "June 30, 2024",
        age: "4 years"
      }
    ],
    'everyday-moments': [
      {
        id: 1,
        src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop",
        caption: "Morning breakfast smiles",
        date: "January 20, 2025",
        age: "5 years"
      },
      {
        id: 2,
        src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
        caption: "Afternoon nap time",
        date: "January 18, 2025",
        age: "5 years"
      },
      {
        id: 3,
        src: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
        caption: "Playing in the backyard",
        date: "January 15, 2025",
        age: "5 years"
      },
      {
        id: 4,
        src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
        caption: "Reading favorite book",
        date: "January 12, 2025",
        age: "5 years"
      },
      {
        id: 5,
        src: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop",
        caption: "Evening cuddles",
        date: "January 10, 2025",
        age: "5 years"
      },
      {
        id: 6,
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
        caption: "Drawing and coloring",
        date: "January 8, 2025",
        age: "5 years"
      },
      {
        id: 7,
        src: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=800&h=800&fit=crop",
        thumbnail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop",
        caption: "Bath time fun",
        date: "January 5, 2025",
        age: "5 years"
      }
    ]
  };

  return photosByCategory[categoryId] || [];
};

export const getPhotoCount = (categoryId: string): number => {
  return getPhotosForCategory(categoryId).length;
};