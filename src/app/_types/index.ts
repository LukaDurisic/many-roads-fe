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
  tourList: Tour[];
}
