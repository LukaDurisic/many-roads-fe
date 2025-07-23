// components/LocationInput.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import styles from "./LocationInput.module.css";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Route } from "@/app/_types";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

type Suggestion = {
  display_name: string;
  lat: string;
  lon: string;
};

export default function LocationInput({
  setValue,
  getValues,
  index,
}: {
  setValue: UseFormSetValue<Route>;
  getValues: UseFormGetValues<Route>;
  index: number;
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = async (q: string) => {
    if (!q) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          q
        )}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setSuggestions(data.slice(0, 10));
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchSuggestions, 500), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedFetch(e.target.value);
  };

  const handleSelect = (item: Suggestion) => {
    setSelected(item);
    setQuery(item.display_name);
    setValue(`attractions.${index}.poi.latitude`, Number(item.lat));
    setValue(`attractions.${index}.poi.longitude`, Number(item.lon));
    setValue(
      `attractions.${index}.address`,
      item.display_name.split(",")[0] + ", " + item.display_name.split(",")[1]
    );

    setSuggestions([]);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.inputContainer} ref={wrapperRef}>
      <input
        type="text"
        value={query || getValues().attractions[index].address}
        onChange={handleChange}
        placeholder={t("address")}
        className={styles.input}
      />
      {suggestions.length > 0 && (
        <ul className={styles.inputUl}>
          {suggestions.map((item, idx) => (
            <li
              className={styles.inputLi}
              key={idx}
              onClick={() => handleSelect(item)}
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
