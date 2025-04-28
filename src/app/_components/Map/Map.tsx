"use client";

import { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  OverlayView,
} from "@react-google-maps/api";
import { type Libraries } from "@react-google-maps/api";
import { MapComponentProps, Route, Attraction } from "@/app/_types";
import RouteCard from "@/app/_components/RouteCard/RouteCard";
import { createSvgIcon } from "@/app/_lib/utils/create-svg";
import { extractLocations, findCenter } from "@/app/_lib/utils/find-map-center";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const Map: React.FC<MapComponentProps> = ({ tourList }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tours, setTours] = useState<Route[]>(tourList);
  const [selectedTour, setSelectedTour] = useState<Route | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const libraries: Libraries = [
    "places",
    "drawing",
    "geometry",
    "visualization",
  ];

  const locationCoordinates = extractLocations(tourList);

  const { lat, lng } = findCenter(locationCoordinates);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleTourClick = useCallback(
    async (tour: Route) => {
      if (selectedTour?.id === tour.id) {
        setSelectedTour(null);
        setDirections(null);
        return;
      }

      setSelectedTour(tour);

      if (!window.google) return;

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
    },
    [selectedTour]
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat, lng }}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* Initial Tour POIs */}
        {tours.map((tour) => (
          <Marker
            key={tour.id}
            position={{
              lat: tour.attractions[0].poi.latitude,
              lng: tour.attractions[0].poi.longitude,
            }}
            icon={{
              url:
                selectedTour?.id === tour.id
                  ? "/assets/route-icon-2.svg"
                  : "/assets/route-icon-2-disabled.svg",
              //scaledSize: new window.google.maps.Size(40, 40), // resize if needed
            }}
            onClick={() => handleTourClick(tour)}
          />
        ))}
        {/* Card generation */}
        {tours.map((tour) => {
          return (
            selectedTour?.id === tour.id && (
              <OverlayView
                key={`overlay-${tour.id}`}
                position={{
                  lat: tour.attractions[0].poi.latitude,
                  lng: tour.attractions[0].poi.latitude,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div>
                  {/* <RouteCard isProfileShowing routeData={tour} /> */}
                </div>
              </OverlayView>
            )
          );
        })}

        {selectedTour &&
          selectedTour.attractions.slice(1).map((attraction: Attraction) => (
            <Marker
              key={attraction.id}
              position={{
                lat: attraction.poi.latitude,
                lng: attraction.poi.longitude,
              }}
              title={attraction.name}
              icon={createSvgIcon(attraction.id)}
              label={{
                text: attraction.name,
                color: "#000000",
              }}
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
      </GoogleMap>
    </div>
  );
};

export default Map;
