"use client";
import React, { useState, useEffect, useRef } from "react";
import Map, { Marker, Source, Layer, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Feature, LineString } from "geojson";
import { Route } from "@/app/_types";
import RouteDisabledIcon from "@/app/assets/routeDisabled.svg";
import Image from "next/image";

const Mapbox = ({
  sigleRoute,
  allRoutes,
  isAllRoutes = false,
}: {
  sigleRoute?: Route;
  allRoutes?: Route[];
  isAllRoutes?: boolean;
}) => {
  const points = isAllRoutes
    ? allRoutes?.map((route) => [
        route.attractions[0].poi.longitude,
        route.attractions[0].poi.latitude,
      ])
    : sigleRoute?.attractions.map((cp) => [cp.poi.longitude, cp.poi.latitude]);

  const mapRef = useRef<MapRef>(null);

  const [routeGeoJSON, setRouteGeoJSON] = useState<
    Feature<LineString> | undefined
  >();

  useEffect(() => {
    async function fetchRoute() {
      if (points) {
        const res = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/walking/${points.join(
            ";"
          )}?geometries=geojson&access_token=pk.eyJ1IjoibWFueXJvYWRzIiwiYSI6ImNtY2o3MmJ2ZDAwNTgycnBwYnFrZG8wNGQifQ.7JU5sz3b9384jX8owaj2Jg`
        );

        const data = await res.json();
        const coords = data.routes[0].geometry.coordinates;
        setRouteGeoJSON(data.routes[0].geometry);

        if (mapRef.current && coords.length > 1) {
          const lats = coords.map((c: number[]) => c[1]);
          const lngs = coords.map((c: number[]) => c[0]);

          const bounds = [
            [Math.min(...lngs), Math.min(...lats)],
            [Math.max(...lngs), Math.max(...lats)],
          ] as [[number, number], [number, number]];

          mapRef.current.getMap().fitBounds(bounds, {
            padding: 100,
            duration: 1000,
          });
        }
      }
    }

    fetchRoute();
  }, []);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      initialViewState={{
        longitude: 17.5,
        latitude: 43.6,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
    >
      <Source id="route" type="geojson" data={routeGeoJSON}>
        <Layer
          id="line-layer"
          type="line"
          paint={{
            "line-color": "black",
            "line-width": 3,
          }}
        />
      </Source>

      {points &&
        points.map(([lng, lat], index) => (
          <Marker key={index} longitude={lng} latitude={lat} anchor="center">
            {isAllRoutes ? (
              <div
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                  userSelect: "none",
                  border: "2px solid white",
                }}
              >
                <Image src={RouteDisabledIcon} alt="routeIcon" />
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  fontWeight: "bold",
                  userSelect: "none",
                  border: "2px solid white",
                }}
              >
                {index + 1}
              </div>
            )}
          </Marker>
        ))}
    </Map>
  );
};

export default Mapbox;
