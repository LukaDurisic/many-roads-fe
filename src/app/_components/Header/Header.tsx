import React from "react";
import styles from "./Header.module.css";
import UserMenu from "../../_components/UserMenu/UserMenu";
import Select from "../Select/Select";
import Search from "../Search/Search";
import Filters from "../Filters/Filters";
import { Route } from "@/app/_types";
import { useTranslation } from "react-i18next";
import "@/app/_translation/i18n";

const testOptions = [{ label: "Hong Kong SAR", value: "HongKongSar" }];

function Header({
  numberOfRoutes,
  routes,
  setRoutes,
  isReload,
  setIsReload,
}: {
  numberOfRoutes?: number;
  routes?: Route[];
  setRoutes?: React.Dispatch<React.SetStateAction<Route[]>>;
  isReload?: boolean;
  setIsReload?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <div className={styles.firstRow}>
        <div className={styles.title}>
          <div className={styles.citySelect}>
            <p className={styles.in}>In</p>
            <Select options={testOptions} style={"city"} />
          </div>
          {!!numberOfRoutes === true && (
            <div className={styles.routes}>
              {t("routesCount", { count: numberOfRoutes || 0 })}
            </div>
          )}
        </div>
        <UserMenu />
      </div>
      <div className={styles.lastRow}>
        <Search
          routes={routes}
          setRoutes={setRoutes}
          isReload={isReload}
          setIsReload={setIsReload}
        />
        <Filters routes={routes} setRoutes={setRoutes} />
      </div>
    </div>
  );
}

export default Header;
