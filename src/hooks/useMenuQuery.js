import { useMemo, useState } from "react";
import { getMenu, queryMenu } from "../services/menu";

export function useMenuQuery() {
  const [query, setQuery] = useState("");
  const [filterId, setFilterId] = useState("all");
  const [sort, setSort] = useState("number");
  const total = getMenu().length;
  const items = useMemo(
    () => queryMenu(getMenu(), { query, filterId, sort }),
    [query, filterId, sort],
  );
  return { query, setQuery, filterId, setFilterId, sort, setSort, items, total };
}
