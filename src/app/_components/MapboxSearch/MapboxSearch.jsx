"use client";
import { useRef, useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

export default function MapboxSearch({ watch, setValue, cpIndex }) {
  const mapContainerRef = (useRef < HTMLDivElement) | (null > null);
  const mapInstanceRef = (useRef < MapboxMap) | (null > null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [pickedLocation, setPickedLocation] = useState([0, 0]);
  console.log(mapLoaded);
  const formAddress = watch(`attractions.${cpIndex}.address`);

  useEffect(() => {
    if (formAddress !== inputValue) {
      setInputValue(formAddress || "");
    }
  }, [formAddress]);

  useEffect(() => {
    mapboxgl.accessToken = accessToken;
    if (mapContainerRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.5, 40],
        zoom: 9,
      });
      mapInstanceRef.current.on("load", () => {
        setMapLoaded(true);
      });
    }
  }, []);

  const icons = {
    search: `
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.88281 3.72656C4.88281 3.1849 5.01302 2.69271 5.27344 2.25C5.53906 1.80208 5.89323 1.44531 6.33594 1.17969C6.77865 0.914062 7.27083 0.78125 7.8125 0.78125C8.35938 0.78125 8.85417 0.914062 9.29688 1.17969C9.73958 1.44531 10.0911 1.80208 10.3516 2.25C10.6172 2.69271 10.75 3.1849 10.75 3.72656C10.75 4.1849 10.6536 4.60938 10.4609 5C10.2682 5.39062 10.0052 5.72396 9.67188 6C9.33854 6.27604 8.96094 6.46615 8.53906 6.57031V11.5156C8.53906 12.0938 8.51562 12.6042 8.46875 13.0469C8.42188 13.4896 8.36198 13.862 8.28906 14.1641C8.22135 14.4661 8.14323 14.6953 8.05469 14.8516C7.97135 15.0026 7.89062 15.0781 7.8125 15.0781C7.73438 15.0781 7.65365 15.0026 7.57031 14.8516C7.48698 14.6953 7.40885 14.4661 7.33594 14.1641C7.26302 13.862 7.20312 13.4896 7.15625 13.0469C7.10938 12.6042 7.08594 12.0938 7.08594 11.5156V6.57031C6.66406 6.46615 6.28646 6.27604 5.95312 6C5.61979 5.72396 5.35677 5.39062 5.16406 5C4.97656 4.60938 4.88281 4.1849 4.88281 3.72656ZM6.97656 3.88281C7.2526 3.88281 7.48958 3.78385 7.6875 3.58594C7.88542 3.38281 7.98438 3.14583 7.98438 2.875C7.98438 2.60417 7.88542 2.36979 7.6875 2.17188C7.48958 1.97396 7.2526 1.875 6.97656 1.875C6.71094 1.875 6.47656 1.97396 6.27344 2.17188C6.07552 2.36979 5.97656 2.60417 5.97656 2.875C5.97656 3.14583 6.07552 3.38281 6.27344 3.58594C6.47656 3.78385 6.71094 3.88281 6.97656 3.88281ZM7.82031 17.9375C6.64323 17.9375 5.59375 17.8438 4.67188 17.6562C3.75521 17.474 2.97917 17.224 2.34375 16.9062C1.70833 16.5938 1.22396 16.237 0.890625 15.8359C0.5625 15.4401 0.398438 15.026 0.398438 14.5938C0.398438 14.1823 0.515625 13.8047 0.75 13.4609C0.984375 13.112 1.29688 12.8021 1.6875 12.5312C2.07812 12.2604 2.51042 12.0312 2.98438 11.8438C3.46354 11.651 3.94792 11.5052 4.4375 11.4062C4.93229 11.3021 5.39323 11.25 5.82031 11.25V12.3906C5.44531 12.3958 5.03646 12.4505 4.59375 12.5547C4.15104 12.6536 3.73177 12.7917 3.33594 12.9688C2.9401 13.1458 2.61458 13.3568 2.35938 13.6016C2.10938 13.8464 1.98438 14.1146 1.98438 14.4062C1.98438 14.7448 2.1276 15.0547 2.41406 15.3359C2.70573 15.6172 3.11198 15.8594 3.63281 16.0625C4.15885 16.2656 4.77604 16.4219 5.48438 16.5312C6.19792 16.6458 6.97656 16.7031 7.82031 16.7031C8.65885 16.7031 9.43229 16.6458 10.1406 16.5312C10.8542 16.4219 11.4714 16.263 11.9922 16.0547C12.5182 15.8516 12.9271 15.6094 13.2188 15.3281C13.5104 15.0521 13.6562 14.7448 13.6562 14.4062C13.6562 14.1146 13.5286 13.8464 13.2734 13.6016C13.0182 13.3568 12.6927 13.1458 12.2969 12.9688C11.901 12.7917 11.4818 12.6536 11.0391 12.5547C10.6016 12.4505 10.1927 12.3958 9.8125 12.3906V11.25C10.2448 11.25 10.7057 11.3021 11.1953 11.4062C11.6901 11.5052 12.1745 11.651 12.6484 11.8438C13.1276 12.0312 13.5625 12.2604 13.9531 12.5312C14.3438 12.8021 14.6536 13.112 14.8828 13.4609C15.1172 13.8047 15.2344 14.1823 15.2344 14.5938C15.2344 15.026 15.0703 15.4401 14.7422 15.8359C14.4141 16.237 13.9323 16.5938 13.2969 16.9062C12.6615 17.224 11.8828 17.474 10.9609 17.6562C10.0443 17.8438 8.9974 17.9375 7.82031 17.9375Z" fill="#757575"/>
    </svg>
`,
  };

  const theme = {
    variables: {
      boxShadow: "none",
      padding: "0px",
      border: "none !important",
      borderRadius: "6px",
      fontFamily: "Inter",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "26px",
      letterSpacing: "0px",
      color: "#0d0d0d",
      backgroundColor: "white",
    },
    icons: icons,
  };

  useEffect(() => {
    setValue(`attractions.${cpIndex}.address`, inputValue);
    setValue(`attractions.${cpIndex}.poi.latitude`, pickedLocation[1]);
    setValue(`attractions.${cpIndex}.poi.longitude`, pickedLocation[0]);
  }, [pickedLocation]);

  return (
    <>
      <SearchBox
        accessToken={accessToken}
        map={mapInstanceRef.current ?? undefined}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={setInputValue}
        marker
        theme={theme}
        onRetrieve={(res) => {
          // console.log("Selected result:", res); //sadrži provinciju i državu
          const address =
            res.features[0]?.properties?.name || res.features[0]?.place_name;
          const coords = res.features[0]?.geometry.coordinates;
          setInputValue(address);
          setPickedLocation(coords);
        }}
      >
        <div
          id="map-container"
          ref={mapContainerRef}
          // style={{ height: "300px", width: "100%" }}
        />
      </SearchBox>
    </>
  );
}
