import menu from "../data/menu.json";

export function getMenu() {
  return menu;
}

export function priceValue(price) {
  if (!price) return Number.POSITIVE_INFINITY;
  const normalized = String(price).replace(/\./g, "").replace(",", ".");
  const value = Number(normalized);
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
}

function numberParts(number) {
  const match = /^(\d+)(.*)$/.exec(number || "");
  if (!match) return [Number.POSITIVE_INFINITY, "\uffff"];
  return [Number(match[1]), match[2]];
}

export function findDish(number, name) {
  return menu.find((row) => row.number === number && row.name === name) || null;
}

export function queryMenu(items, { query, filterId, sort }) {
  const q = (query || "").trim().toLocaleLowerCase("de");
  const matched = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => {
      const chipOk =
        !filterId ||
        filterId === "all" ||
        item.category === filterId ||
        (item.tags || []).includes(filterId);
      if (!chipOk) return false;
      if (!q) return true;
      const haystack = [item.number, item.name, item.description, item.category]
        .join("\n")
        .toLocaleLowerCase("de");
      return haystack.includes(q);
    });

  matched.sort((a, b) => {
    if (sort === "name") {
      const byName = a.item.name.localeCompare(b.item.name, "de", { sensitivity: "base" });
      return byName || a.index - b.index;
    }
    if (sort === "price") {
      const byPrice = priceValue(a.item.price) - priceValue(b.item.price);
      return byPrice || a.index - b.index;
    }
    const [an, asuf] = numberParts(a.item.number);
    const [bn, bsuf] = numberParts(b.item.number);
    if (an !== bn) return an - bn;
    const bySuffix = asuf.localeCompare(bsuf, "de");
    return bySuffix || a.index - b.index;
  });

  return matched.map((entry) => entry.item);
}
