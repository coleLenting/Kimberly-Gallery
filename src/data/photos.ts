
import { Photo } from '../types/photo';

// Import your local images
import photo1 from '../assets/images/photo1.jpg';
import photo2 from '../assets/images/photo2.jpg';
import photo3 from '../assets/images/photo3.jpg';
import photo4 from '../assets/images/photo4.jpg';
import photo5 from '../assets/images/photo5.jpg';
import photo6 from '../assets/images/photo6.jpg';
import photo7 from '../assets/images/photo7.jpg';
import photo8 from '../assets/images/photo8.jpg';
import photo9 from '../assets/images/photo9.jpg';
import photo10 from '../assets/images/photo10.jpg';
import photo11 from '../assets/images/photo10.jpg';
import photo12 from '../assets/images/photo10.jpg';
import photo13 from '../assets/images/photo10.jpg';
import photo14 from '../assets/images/photo10.jpg';
import photo15 from '../assets/images/photo10.jpg';
import photo16 from '../assets/images/photo10.jpg';
import photo17 from '../assets/images/photo10.jpg';
import photo18 from '../assets/images/photo10.jpg';

// Photo templates with local images - add more as you add images to the assets folder
const photoTemplates = [
  {
    url: photo1,
    title: 'Sleepy Afternoon',
    description: 'Such a peaceful moment captured during naptime. The soft sunlight made everything feel so cozy and warm.'
  },
  {
    url: photo2,
    title: 'Curious Eyes',
    description: 'Those bright, inquisitive eyes always looking for the next adventure. Every day brings new discoveries!'
  },
  {
    url: photo3,
    title: 'Snack Time Fun',
    description: 'Learning to share is such an important lesson. This sweet moment shows how caring and generous little hearts can be.'
  },
  {
    url: photo4,
    title: 'Best Friends',
    description: 'Friendship knows no boundaries. These two were inseparable during our zoo visit - such a magical day!'
  },
  {
    url: photo5,
    title: 'Morning Sunshine',
    description: 'Starting the day with such joy and energy. These precious morning moments are treasures that last forever.'
  },
  {
    url: photo6,
    title: 'Garden Explorer',
    description: 'Discovering the wonders of nature in the backyard. Every leaf, every flower is a new world to explore!'
  },
  {
    url: photo7,
    title: 'Snack Time Fun',
    description: 'Learning to share is such an important lesson. This sweet moment shows how caring and generous little hearts can be.'
  },
  {
    url: photo8,
    title: 'Best Friends',
    description: 'Friendship knows no boundaries. These two were inseparable during our zoo visit - such a magical day!'
  },
  {
    url: photo9,
    title: 'Morning Sunshine',
    description: 'Starting the day with such joy and energy. These precious morning moments are treasures that last forever.'
  },
  {
    url: photo10,
    title: 'Garden Explorer',
    description: 'Discovering the wonders of nature in the backyard. Every leaf, every flower is a new world to explore!'
  },
  {
    url: photo11,
    title: 'Morning Sunshine',
    description: 'Starting the day with such joy and energy. These precious morning moments are treasures that last forever.'
  },
  {
    url: photo12,
    title: 'Garden Explorer',
    description: 'Discovering the wonders of nature in the backyard. Every leaf, every flower is a new world to explore!'
  },
  {
    url: photo13,
    title: 'Snack Time Fun',
    description: 'Learning to share is such an important lesson. This sweet moment shows how caring and generous little hearts can be.'
  },
  {
    url: photo14,
    title: 'Best Friends',
    description: 'Friendship knows no boundaries. These two were inseparable during our zoo visit - such a magical day!'
  },
  {
    url: photo15,
    title: 'Morning Sunshine',
    description: 'Starting the day with such joy and energy. These precious morning moments are treasures that last forever.'
  },
  {
    url: photo16,
    title: 'Garden Explorer',
    description: 'Discovering the wonders of nature in the backyard. Every leaf, every flower is a new world to explore!'
  }
];

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const years = ['2023', '2024'];

export const generatePhotos = (count: number, startIndex: number = 0): Photo[] => {
  const photos: Photo[] = [];
  const totalTemplates = photoTemplates.length;
  
  for (let i = 0; i < count; i++) {
    // Cycle through available templates based on array size
    const templateIndex = (startIndex + i) % totalTemplates;
    const template = photoTemplates[templateIndex];
    const month = months[Math.floor(Math.random() * months.length)];
    const year = years[Math.floor(Math.random() * years.length)];
    
    photos.push({
      id: (startIndex + i + 1).toString(),
      url: template.url,
      title: template.title,
      date: `${month} ${year}`,
      description: template.description
    });
  }
  
  return photos;
};

// Generate initial photos based on available templates
export const photos: Photo[] = generatePhotos(Math.min(12, photoTemplates.length));
