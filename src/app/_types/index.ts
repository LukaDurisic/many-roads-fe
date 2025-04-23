export interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description: string;
  type: "cinema" | "restaurant" | "museum";
}

export interface Tour {
  id: string;
  name: string;
  type: "cinema" | "restaurant" | "museum";
  locations: Location[];
}

export type Coordinate = {
  lat: number;
  lng: number;
};

export interface MapComponentProps {
  tourList: Route[];
}
export interface Creator {
  id: number;
  username: string;
  email: string;
  profile_image: string;
  first_name: string;
  last_name: string;
}

export interface Image {
  attraction?: number;
  route?: number;
  id: number;
  caption: string;
  source: string;
  url: string;
}

export interface Poi {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}
export interface Attraction {
  id: number;
  address: string;
  audio: string;
  content: string;
  images: Image[];
  name: string;
  needs_upload: boolean;
  poi: Poi;
}

export interface Direction {
  id: number;
  origin: number;
  destination: number;
  points: string;
}

export interface Rating {
  author: Creator;
  comment: string;
  date_added: string;
  first_name: string;
  lastName: string;
  id: number;
  value: string;
}

export interface Route {
  id: number;
  name: string;
  description: string;
  start: string;
  end: string;
  transport_mode: string;
  duration_est: string;
  num_of_completed_routes: number;
  total_attractions: number;
  distance: string;
  difficulty: string;
  language: string;
  country: string;
  audio: string;
  categories: string[];
  category: number[];
  tags: string[];
  creator: Creator;
  attractions: Attraction[];
  directions: Direction[];
  images: Image[];
  ratings: Rating[];
  accessibility: string;
  date_added: string;
  type: string;
}
