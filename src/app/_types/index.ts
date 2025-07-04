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
  isSingleRoute: boolean;
}

export interface SingleRouteMarkerProps {
  tour: Route;
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
  image_id: number;
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
  id?: number;
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
  last_name: string;
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
  province: string;
  // isAudio: boolean;
  categories: string[];
  category: number[];
  tags: string[];
  creator: Creator;
  attractions: Attraction[];
  directions: Direction[];
  images: Image[];
  ratings: Rating[];
  accessibility: string[];
  date_added: string;
  type: string;
}

export interface RouteCardProps {
  id: number;
  name: string;
  start: string;
  end: string;
  duration_est: string;
  num_of_completed_routes: number;
  total_attractions: number;
  distance: string;
  tags: string[];
  creator: Creator;
  images: Image[];
  country: string;
  categories: string[];
}

export interface UserInfoProps {
  username: string | undefined;
  profile_image: string | undefined;
  date_added?: string | undefined;
  country?: string | undefined;
}

export interface Review {
  id: number;
  username: string;
  stars: number;
  createdAt: string;
  description: string;
  profileImg: string;
  images: string[] | [];
  isReported: boolean;
}

export interface AttractionImages {
  attractionIndex: number;
  heroImage?: File;
  images: File[];
}

export interface PreviewAttraction {
  index: number;
  heroImage: string;
  images: string[];
}

export interface CreateRouteBody {
  name: string;
  language: string;
  type: string;
  country: string;
  difficulty: string;
  route_gallery: Image[];
  duration: string;
  categories: string[];
  accessibility: string;
  description: string;
  distance: string;
  checkpoints: Checkpoint[];
}

export interface Checkpoint {
  name: string;
  content: string;
  address: string;
  checkpoint_gallery: Image[];
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Image {
  image_id: number;
  caption: string;
  source: string;
  url: string;
}
