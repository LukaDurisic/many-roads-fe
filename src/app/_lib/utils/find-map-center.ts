import { Coordinate, Route } from "@/app/_types";

export const findCenter = (coordinates: Coordinate[]): Coordinate => {
  if (coordinates.length === 0) return { lat: 0, lng: 0 };

  const sum = coordinates.reduce(
    (acc, coord) => {
      acc.lat += coord.lat;
      acc.lng += coord.lng;
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  const count = coordinates.length;
  return {
    lat: sum.lat / count,
    lng: sum.lng / count,
  };
};

export const extractLocations = (tours: Route[]) => {
  const tourCoordinates: Coordinate[] = [];
  tours.forEach((tour) => {
    tour.attractions.forEach((attraction) => {
      tourCoordinates.push({
        lat: attraction.poi.latitude,
        lng: attraction.poi.longitude,
      });
    });
  });

  return tourCoordinates;
};
