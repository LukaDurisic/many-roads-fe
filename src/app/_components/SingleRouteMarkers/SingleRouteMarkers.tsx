import { Attraction, Route, SingleRouteMarkerProps } from "@/app/_types";
import { useEffect, useState } from "react";
import { createSvgIcon } from "@/app/_lib/utils/create-svg";
import { DirectionsRenderer, Marker } from "@react-google-maps/api";

const SingleRouteMarkers: React.FC<SingleRouteMarkerProps> = ({ tour }) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tours, setTours] = useState<Route[]>([tour]);

  useEffect(() => {
    const generateDirections = async (tour: Route) => {
      const directionsService = new google.maps.DirectionsService();

      try {
        const result = await directionsService.route({
          origin: new google.maps.LatLng(
            tour.attractions[0].poi.latitude,
            tour.attractions[0].poi.longitude
          ),
          destination: new google.maps.LatLng(
            tour.attractions[tour.attractions.length - 1].poi.latitude,
            tour.attractions[tour.attractions.length - 1].poi.longitude
          ),
          waypoints: tour.attractions.slice(1, -1).map((attraction) => ({
            location: new google.maps.LatLng(
              attraction.poi.latitude,
              attraction.poi.longitude
            ),
            stopover: true,
          })),
          travelMode: google.maps.TravelMode.WALKING,
        });

        setDirections(result);
      } catch (error) {
        console.error("Error fetching directions:", error);
      }
    };
    generateDirections(tour);
  }, [tour]);

  return (
    <>
      {tours[0].attractions.map((attraction: Attraction, index) => (
        <Marker
          key={attraction.id}
          position={{
            lat: attraction.poi.latitude,
            lng: attraction.poi.longitude,
          }}
          title={attraction.name}
          icon={createSvgIcon(index + 1)}
        />
      ))}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#000000",
              strokeWeight: 4,
            },
          }}
        />
      )}
    </>
  );
};

export default SingleRouteMarkers;
