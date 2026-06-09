import { cloudinaryImage, cloudinaryVideo } from "../lib/cloudinary";

export const photographer = {
  name: "Ajay Bhosale",
  role: "Professional Photographer",
  subtitle: "Visual Storyteller",
  shortBio:
    "I capture stories, emotions, and moments that would otherwise be forgotten.",
  location: "Pune, Maharashtra",
  email: "hello@ajaybhosale.com",
  phone: "+91 98765 43210",
  instagram: "@ajaybhosale.frames",
  portrait: cloudinaryImage("samples/people/jazz", {
    width: 900,
    height: 1200,
    crop: "fill",
    gravity: "face",
  }),
  introVideo: cloudinaryVideo("samples/sea-turtle", {
    width: 1920,
    height: 1080,
    crop: "fill",
  }),
  stats: [
    { label: "Years Experience", value: "12+" },
    { label: "Global Projects", value: "85+" },
    { label: "Awards Won", value: "14" },
  ],
};

export const photos = [
  {
    slug: "after-the-monsoon",
    title: "After The Monsoon",
    location: "Mumbai, India",
    date: "Aug 14, 2025",
    category: "Street",
    image: cloudinaryImage("samples/people/bicycle", {
      width: 1200,
      height: 1600,
    }),
    altImage: cloudinaryImage("samples/people/bicycle", {
      width: 1800,
      height: 1200,
    }),
    featured: true,
    story: [
      "The street had just exhaled after an hour of rain. Reflections turned the asphalt into a ribbon of silver while commuters moved like silhouettes through mist and brake lights.",
      "I waited for the exact second when motion, weather, and color aligned. The bicycle rider entered the frame as if the city itself had staged the moment for a single heartbeat.",
    ],
    settings: "1/320 sec, f/2.8, ISO 800",
    equipment: "Sony A7R V, 35mm GM",
    challenges:
      "Low contrast, slippery footing, and rapidly changing reflections.",
  },
  {
    slug: "voice-of-saffron",
    title: "Voice Of Saffron",
    location: "Jaipur, India",
    date: "Nov 02, 2025",
    category: "Portraits",
    image: cloudinaryImage("samples/people/jazz", {
      width: 1200,
      height: 1600,
      gravity: "face",
    }),
    altImage: cloudinaryImage("samples/people/jazz", {
      width: 1800,
      height: 1200,
      gravity: "face",
    }),
    featured: true,
    story: [
      "This portrait was built around quiet confidence. Instead of directing heavily, I let the subject settle into their own rhythm while natural window light traced every expression.",
      "The final frame feels intimate because the subject never performed. They simply existed, and the photograph honors that truth.",
    ],
    settings: "1/160 sec, f/1.8, ISO 250",
    equipment: "Sony A1, 50mm f/1.2",
    challenges: "Maintaining softness without losing the tension in the eyes.",
  },
  {
    slug: "mountains-before-sunrise",
    title: "Mountains Before Sunrise",
    location: "Spiti Valley, India",
    date: "Jan 09, 2026",
    category: "Nature",
    image: cloudinaryImage("samples/landscapes/nature-mountains", {
      width: 1200,
      height: 1600,
    }),
    altImage: cloudinaryImage("samples/landscapes/nature-mountains", {
      width: 1800,
      height: 1200,
    }),
    featured: true,
    story: [
      "At that altitude, silence becomes a character. Before dawn, the mountains shifted from graphite to blue while a distant line of light slowly carved the ridges into view.",
      "I exposed for restraint rather than spectacle, preserving the feeling of standing in front of something ancient and patient.",
    ],
    settings: "1/10 sec, f/11, ISO 100",
    equipment: "Sony A7 IV, 24-70mm GM II",
    challenges: "Sub-zero wind and minute changes in early light.",
  },
  {
    slug: "urban-winds",
    title: "Urban Winds",
    location: "Istanbul, Turkey",
    date: "Mar 18, 2025",
    category: "Travel",
    image: cloudinaryImage("samples/landscapes/girl-urban-view", {
      width: 1200,
      height: 1600,
    }),
    altImage: cloudinaryImage("samples/landscapes/girl-urban-view", {
      width: 1800,
      height: 1200,
    }),
    featured: true,
    story: [
      "The city was moving fast, but the rooftop carried its own stillness. I framed the scene to let architecture, wind, and body language create the narrative.",
      "What I love about travel photography is the collision of scale. One person, one moment, and an entire city leaning into the frame.",
    ],
    settings: "1/640 sec, f/4, ISO 200",
    equipment: "Sony A7C II, 24mm G",
    challenges: "Balancing strong wind with a precise edge composition.",
  },
  {
    slug: "balloons-at-dawn",
    title: "Balloons At Dawn",
    location: "Cappadocia, Turkey",
    date: "Sep 21, 2025",
    category: "Travel",
    image: cloudinaryImage("samples/balloons", { width: 1200, height: 1600 }),
    altImage: cloudinaryImage("samples/balloons", {
      width: 1800,
      height: 1200,
    }),
    featured: false,
    story: [
      "This is the kind of frame that only works when patience beats adrenaline. The temptation is to shoot everything, but the image became stronger when I waited for separation and calm.",
    ],
    settings: "1/500 sec, f/5.6, ISO 160",
    equipment: "Sony A7R V, 70-200mm GM",
    challenges: "Managing haze while keeping color separation clean.",
  },
  {
    slug: "winter-keeper",
    title: "Winter Keeper",
    location: "Lapland, Finland",
    date: "Dec 03, 2025",
    category: "Wildlife",
    image: cloudinaryImage("samples/animals/reindeer", {
      width: 1200,
      height: 1600,
    }),
    altImage: cloudinaryImage("samples/animals/reindeer", {
      width: 1800,
      height: 1200,
    }),
    featured: true,
    story: [
      "Snow absorbs sound in a way that makes every movement feel ceremonial. The reindeer stood in profile for only a moment, but the quiet around it amplified the frame.",
    ],
    settings: "1/400 sec, f/4, ISO 640",
    equipment: "Sony A1, 135mm GM",
    challenges: "White balance drift and preserving texture in bright snow.",
  },
  {
    slug: "cathedral-signs",
    title: "Cathedral Signs",
    location: "Lisbon, Portugal",
    date: "Apr 28, 2025",
    category: "Street",
    image: cloudinaryImage("samples/landscapes/architecture-signs", {
      width: 1200,
      height: 1600,
    }),
    altImage: cloudinaryImage("samples/landscapes/architecture-signs", {
      width: 1800,
      height: 1200,
    }),
    featured: false,
    story: [
      "I was drawn to the collision of architecture and typography. The frame became less about the building and more about how cities leave clues about their own personality.",
    ],
    settings: "1/250 sec, f/5, ISO 320",
    equipment: "Sony A7 IV, 35mm GM",
    challenges:
      "Removing visual noise without flattening the energy of the street.",
  },
  {
    slug: "quiet-gaze",
    title: "Quiet Gaze",
    location: "Pune, India",
    date: "May 11, 2025",
    category: "Fashion",
    image: cloudinaryImage("samples/people/smiling-man", {
      width: 1200,
      height: 1600,
      gravity: "face",
    }),
    altImage: cloudinaryImage("samples/people/smiling-man", {
      width: 1800,
      height: 1200,
      gravity: "face",
    }),
    featured: false,
    story: [
      "Editorial work asks for precision, but the frame only works when there is room for surprise. This shot stayed because the subject softened for just half a second.",
    ],
    settings: "1/200 sec, f/2.2, ISO 200",
    equipment: "Sony A7R IV, 85mm GM",
    challenges: "Keeping wardrobe texture rich while protecting skin tones.",
  },
  {
    slug: "shepherds-hour",
    title: "Shepherd's Hour",
    location: "Ladakh, India",
    date: "Jul 07, 2025",
    category: "Documentary",
    image: cloudinaryImage("samples/sheep", { width: 1200, height: 1600 }),
    altImage: cloudinaryImage("samples/sheep", { width: 1800, height: 1200 }),
    featured: false,
    story: [
      "The scene was ordinary to the people living it, which is exactly what made it extraordinary to me. Documentary photography is often about recognizing grace inside routine.",
    ],
    settings: "1/250 sec, f/6.3, ISO 250",
    equipment: "Sony A7C II, 55mm Zeiss",
    challenges:
      "Dust, flat midday light, and moving subjects layered in depth.",
  },
  {
    slug: "market-notes",
    title: "Market Notes",
    location: "Delhi, India",
    date: "Oct 17, 2025",
    category: "Events",
    image: cloudinaryImage("samples/food/spices", {
      width: 1200,
      height: 1600,
    }),
    altImage: cloudinaryImage("samples/food/spices", {
      width: 1800,
      height: 1200,
    }),
    featured: false,
    story: [
      "The market was visually overwhelming in the best possible way. I shot through movement and color until the composition resolved into rhythm rather than chaos.",
    ],
    settings: "1/160 sec, f/3.5, ISO 500",
    equipment: "Sony A7 IV, 28mm f/2",
    challenges: "Extreme color contrast and constant human movement.",
  },
  {
    slug: "keeper-of-light",
    title: "Keeper Of Light",
    location: "Milan, Italy",
    date: "Feb 20, 2026",
    category: "Fashion",
    image: cloudinaryImage("samples/ecommerce/accessories-bag", {
      width: 1200,
      height: 1600,
    }),
    altImage: cloudinaryImage("samples/ecommerce/accessories-bag", {
      width: 1800,
      height: 1200,
    }),
    featured: true,
    story: [
      "Luxury still-life work is about restraint. The object should feel desirable, but the real goal is to make texture, shape, and light carry the emotion without excess.",
    ],
    settings: "1/125 sec, f/8, ISO 100",
    equipment: "Sony A7R V, 90mm Macro",
    challenges: "Micro reflections and preserving tonal depth in dark leather.",
  },
  {
    slug: "rest-between-journeys",
    title: "Rest Between Journeys",
    location: "Varanasi, India",
    date: "Jun 30, 2025",
    category: "Portraits",
    image: cloudinaryImage("samples/people/kitchen-bar", {
      width: 1200,
      height: 1600,
    }),
    altImage: cloudinaryImage("samples/people/kitchen-bar", {
      width: 1800,
      height: 1200,
    }),
    featured: false,
    story: [
      "I try to leave enough silence in my portrait work for the viewer to finish the sentence themselves. This frame holds because it suggests a life larger than the moment.",
    ],
    settings: "1/125 sec, f/2, ISO 640",
    equipment: "Sony A7 IV, 50mm f/1.4",
    challenges:
      "Low interior light and preserving warmth without clipping highlights.",
  },
];

export const categories = [
  { name: "Portraits", image: photos[1].image },
  { name: "Street", image: photos[0].image },
  { name: "Nature", image: photos[2].image },
  { name: "Travel", image: photos[4].image },
  { name: "Wildlife", image: photos[5].image },
  { name: "Events", image: photos[9].image },
  { name: "Fashion", image: photos[10].image },
];

export const projects = [
  {
    name: "Monsoon City Symphony",
    client: "Editorial Commission",
    location: "Mumbai",
    equipment: "Sony A1, 35mm GM, 70-200mm GM",
    story:
      "A rain-soaked editorial about resilience, movement, and the cinematic texture of urban India.",
    images: [photos[0].image, photos[6].image, photos[9].image],
  },
  {
    name: "Quiet Power",
    client: "Luxury Portrait Series",
    location: "Jaipur & Pune",
    equipment: "Sony A7R V, 50mm f/1.2, 85mm GM",
    story:
      "A portrait study designed around presence, silence, and the visual language of confidence.",
    images: [photos[1].image, photos[7].image, photos[11].image],
  },
  {
    name: "Altitude Diaries",
    client: "Travel Documentary",
    location: "Spiti & Ladakh",
    equipment: "Sony A7 IV, 24-70mm GM II, 55mm Zeiss",
    story:
      "A slow travel narrative following light, weather, and the quiet rituals of remote landscapes.",
    images: [photos[2].image, photos[5].image, photos[8].image],
  },
];

export const testimonials = [
  {
    name: "Ananya Kulkarni",
    role: "Editorial Producer",
    rating: 5,
    image: photos[1].image,
    review:
      "Ajay photographs emotion without forcing it. Every frame feels luxurious, honest, and cinematic.",
  },
  {
    name: "Luca Moretti",
    role: "Brand Director",
    rating: 5,
    image: photos[10].image,
    review:
      "The project felt less like a shoot and more like an art direction session built around story and atmosphere.",
  },
  {
    name: "Maya Thomas",
    role: "Travel Editor",
    rating: 5,
    image: photos[2].image,
    review:
      "He sees narrative in ordinary transitions. The final gallery carried the mood of an award-winning short film.",
  },
];
