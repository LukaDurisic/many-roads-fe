"use client";
import React, { useState, useEffect, useRef } from "react";
import Map, { Marker, Source, Layer, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Feature, LineString } from "geojson";
import { Route } from "@/app/_types";
import RouteDisabledIcon from "@/app/assets/routeDisabled.svg";
import RouteIcon from "@/app/assets/route.svg";
import RouteCard from "../_components/RouteCard/RouteCard";
import Image from "next/image";
import styles from "./Mapbox.module.css";
import { UseFormWatch, UseFormSetValue } from "react-hook-form";

type MapboxFeatureProperties = {
  full_name?: string;
  full_address?: string;
  [key: string]: any;
};

const Mapbox = ({
  sigleRoute,
  allRoutes,
  isAllRoutes = false,
  isPickable = false,
  setValue,
  watch,
  atrIndex = 0,
}: {
  sigleRoute?: Route;
  allRoutes?: Route[];
  isAllRoutes?: boolean;
  isPickable?: boolean;
  setValue?: UseFormSetValue<Route>;
  watch?: UseFormWatch<Route>;
  atrIndex?: number;
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
  const allCoordinatesArray: { lat: number; lng: number }[] = [];
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  console.log(atrIndex);

  if (isAllRoutes && allRoutes) {
    allRoutes.forEach((route) => {
      allCoordinatesArray.push({
        lng: route.attractions[0].poi.longitude,
        lat: route.attractions[0].poi.latitude,
      });
    });
  }

  const [selectedCheckpoint, setSelectedCheckpoint] = useState<number | null>(
    null
  );
  const [info, setInfo] = useState<MapboxFeatureProperties | undefined>();

  useEffect(() => {
    async function fetchAndFitRoute() {
      if (!points || points.length === 0) return;

      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/walking/${points.join(
          ";"
        )}?geometries=geojson&access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_API_KEY
        }`
      );
      const data = await res.json();

      if (!data.routes || data.routes.length === 0) {
        console.error("No routes found:", data);
        return;
      }

      const coords: [number, number][] = data.routes[0].geometry.coordinates;

      setRouteGeoJSON({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coords,
        },
        properties: {},
      });

      if (mapRef.current && coords.length > 1) {
        const lats = coords.map((c) => c[1]);
        const lngs = coords.map((c) => c[0]);

        const bounds: [[number, number], [number, number]] = [
          [Math.min(...lngs), Math.min(...lats)],
          [Math.max(...lngs), Math.max(...lats)],
        ];

        mapRef.current.getMap().fitBounds(bounds, {
          padding: 100,
          duration: 1000,
        });
      }
    }

    if (sigleRoute) {
      fetchAndFitRoute();
    }
  }, []);

  const handleMapClick = (event: mapboxgl.MapLayerMouseEvent) => {
    if (!isPickable) return;
    const { lngLat } = event;
    setPickedLocation({ lat: lngLat.lat, lng: lngLat.lng });
  };

  useEffect(() => {
    async function fetchLocationInfo() {
      const res = await fetch(
        `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${pickedLocation?.lng}&latitude=${pickedLocation?.lat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
      );
      const data = await res.json();
      if (Array.isArray(data?.features) && data.features.length > 0) {
        const properties = data.features[0].properties;
        if (properties) {
          setInfo(properties);
        }
      }
    }

    fetchLocationInfo();
  }, [pickedLocation]);

  useEffect(() => {
    if (setValue && pickedLocation) {
      setValue(`attractions.${0}.poi.latitude`, pickedLocation.lat);
      setValue(`attractions.${0}.poi.longitude`, pickedLocation.lng);
    }
  }, [pickedLocation]);

  useEffect(() => {
    if (setValue && info) {
      setValue(
        `attractions.${0}.address`,
        info.full_name || info.full_address || ""
      );
    }
  }, [info]);

  useEffect(() => {
    if (!watch) return;

    const subscription = watch((value) => {
      const attraction = value.attractions?.[0];
      const poi = attraction?.poi;

      const newLat = poi?.latitude;
      const newLng = poi?.longitude;

      if (
        newLat !== undefined &&
        newLng !== undefined &&
        (pickedLocation?.lat !== newLat || pickedLocation?.lng !== newLng)
      ) {
        setPickedLocation({
          lat: newLat,
          lng: newLng,
        });
      }
    });

    return () => subscription.unsubscribe?.();
  }, [watch, pickedLocation]);

  useEffect(() => {
    if (mapRef.current && pickedLocation) {
      mapRef.current.flyTo({
        center: [pickedLocation.lng, pickedLocation.lat],
        zoom: 14,
        duration: 1000,
      });
    }
  }, [pickedLocation]);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      initialViewState={{
        longitude: 114.1694,
        latitude: 22.3193,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      ref={mapRef}
      onClick={handleMapClick}
      style={{
        cursor: isPickable ? "pointer" : "grab",
      }}
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

      {isPickable && pickedLocation && (
        <Marker
          longitude={pickedLocation.lng}
          latitude={pickedLocation.lat}
          anchor="bottom"
          color="black"
        />
      )}

      {points &&
        points.map(([lng, lat], index) => (
          <Marker
            key={index}
            longitude={lng}
            latitude={lat}
            anchor="center"
            onClick={() => {
              const [lng, lat] = points[index];
              const newSelected = selectedCheckpoint === index ? null : index;
              setSelectedCheckpoint(newSelected);

              if (mapRef.current && newSelected !== null) {
                mapRef.current.flyTo({
                  center: [lng, lat],
                  zoom: 14,
                  duration: 1000,
                });
              }
            }}
          >
            {isAllRoutes ? (
              <div className={styles.routeIcon}>
                {selectedCheckpoint === index ? (
                  <>
                    <Image src={RouteIcon} alt="routeIcon" />
                    {allRoutes && (
                      <div className={styles.routeCardPopup}>
                        <RouteCard
                          isClickable
                          routeData={allRoutes[index]}
                          isProfileShowing
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <Image src={RouteDisabledIcon} alt="routeIcon" />
                )}
              </div>
            ) : (
              <div className={styles.singleRouteCp}>{index + 1}</div>
            )}
          </Marker>
        ))}
    </Map>
  );
};

export default Mapbox;
