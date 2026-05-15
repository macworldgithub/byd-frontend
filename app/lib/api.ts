const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://byd-backend.omnisuiteai.com";

export interface CarSpec {
  value: string;
  unit: string;
  label: string;
}

export interface ExteriorColor {
  name: string;
  colorCode: string;
  images: {
    front: { essential: string; premium: string };
    side: { essential: string; premium: string };
  };
}

export interface InteriorColor {
  name: string;
  image: string;
}

export interface ShowcaseFeature {
  image: string;
  title: string;
  description: string;
}

export interface CarModel {
  name: string;
  specs: string[];
}

export interface CarData {
  id: string; // mapped from carId by the backend transform
  carId: string;
  name: string;
  subtitle: string;
  status: string;
  type: string;
  heroImage: string;
  bannerImage: string;
  collageImages: string[];
  showcaseImages: string[];
  videos: string[];
  showcaseFeatures: ShowcaseFeature[];
  exteriorColors: ExteriorColor[];
  interiorColors: InteriorColor[];
  specs: CarSpec[];
  overview: { heading: string; body: string };
  design: { title: string; features: { title: string; description: string }[] };
  technology: { title: string; features: { title: string; description: string }[] };
  styling: { title: string; subtitle: string };
  safety: { features: { title: string; description: string }[] };
  storage: { boot: string; expanded: string };
  models: CarModel[];
  moreInfo: { handbook: string; testDrive: string };
  specifications: [string, string][];
  features: string[];
}

export interface CarListItem {
  id: string;
  carId: string;
  name: string;
  type: string;
  status: string;
  subtitle: string;
  heroImage: string;
  showcaseImages: string[];
}

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s (Next.js 13+)
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText} — ${path}`);
  }

  return res.json();
}

/** Fetch all cars (list view — returns full documents but we use a subset) */
export async function getAllCars(): Promise<CarListItem[]> {
  const cars = await fetchJSON<CarData[]>("/api/cars");
  return cars.map((car) => ({
    id: car.carId,
    carId: car.carId,
    name: car.name,
    type: car.type,
    status: car.status,
    subtitle: car.subtitle,
    heroImage: car.heroImage,
    showcaseImages: car.showcaseImages,
  }));
}

/** Fetch a single car by carId or MongoDB _id */
export async function getCarById(id: string): Promise<CarData> {
  const car = await fetchJSON<CarData>(`/api/cars/${id}`);
  return car;
}