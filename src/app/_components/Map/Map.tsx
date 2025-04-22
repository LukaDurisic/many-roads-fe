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
import { Tour, Location } from "@/app/_types";
import { tours as initialTours } from "@/app/_mock-data/tours";
// import RouteCard from "@/app/components/RouteCard/RouteCard";
// import { routesMock } from "@/app/components/RoutesContainer/utils";
import { createSvgIcon } from "@/app/_lib/utils/create-svg";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 43.508751,
  lng: 16.440981,
};

const Map = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
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
    async (tour: Tour) => {
      if (selectedTour?.id === tour.id) {
        setSelectedTour(null);
        setDirections(null);
        return;
      }

      setSelectedTour(tour);

      /* setSelectedMarkerId(tour.id); */

      if (!window.google) return;

      const directionsService = new google.maps.DirectionsService();

      try {
        const result = await directionsService.route({
          origin: new google.maps.LatLng(
            tour.locations[0].lat,
            tour.locations[0].lng
          ),
          destination: new google.maps.LatLng(
            tour.locations[tour.locations.length - 1].lat,
            tour.locations[tour.locations.length - 1].lng
          ),
          waypoints: tour.locations.slice(1, -1).map((location) => ({
            location: new google.maps.LatLng(location.lat, location.lng),
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
        center={center}
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
        {tours.map((tour) => (
          <Marker
            key={tour.id}
            position={{
              lat: tour.locations[0].lat,
              lng: tour.locations[0].lng,
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
        {tours.map((tour) => {
          /* console.log("selectedMarkerId", selectedMarkerId); */
          console.log("tourID", tour.id);

          return (
            selectedTour?.id === tour.id && (
              <OverlayView
                key={`overlay-${tour.id}`}
                position={{
                  lat: tour.locations[0].lat,
                  lng: tour.locations[0].lng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div>{/* <RouteCard isProfileShowing routeData={} /> */}</div>
              </OverlayView>
            )
          );
        })}

        {/* {tours.map(
          (tour, index) =>
            selectedMarkerId === tour.id && (
              <OverlayView
                key={`overlay-${tour.id}`}
                position={{
                  lat: tour.locations[index].lat,
                  lng: tour.locations[index].lng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div>
                  <RouteCard routeData={routesMock[1]} />
                </div>
              </OverlayView>
            )
        )} */}

        {selectedTour &&
          selectedTour.locations.slice(1).map((location: Location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
              icon={createSvgIcon(location.id)}
              label={{
                text: location.name,
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
