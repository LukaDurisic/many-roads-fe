"use client";
import React from "react";
import styles from "./Navbar.module.css";
import AddIcon from "../../assets/add";
import SearchIcon from "../../assets/search";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  const isActive = (route: string) => pathname.includes(route);

  return (
    <div className={styles.wrapper}>
      <Link href="/dashboard">
        <SearchIcon
          fill={
            isActive("/dashboard") || isActive("/route") ? "#000" : "#ADADAD"
          }
        />
      </Link>
      <Link href="/createRoute">
        <AddIcon stroke={isActive("/createRoute") ? "#000" : "#ADADAD"} />
      </Link>
    </div>
  );
}

export default Navbar;
