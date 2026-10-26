import { FILTERS } from "../data/filters";
import { useI18n } from "../context/LanguageContext";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useMenuQuery } from "../hooks/useMenuQuery";

function rowKey(row, index) {
  return `${row.number}|${row.name}|${row.price}|${index}`;
}

export function MenuBrowser() {
  const { t, dict } = useI18n();
  const wide = useMediaQuery("(min-width: 900px)");
  const { query, setQuery, filterId, setFilterId, sort, setSort, items } = useMenuQuery();
  const countLabel = `${items.length} ${items.length === 1 ? t("menu.dish") : t("menu.dishes")}`;

  return (
    <div className="menu-browser">
      <div className="menu-tools">
        <div className="field grow">
          <label htmlFor="menu-search">{t("menu.searchLabel")}</label>
          <input
            id="menu-search"
            type="search"
            value={query}
            placeholder={t("menu.searchPlaceholder")}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="field">
          <label htmlFor="menu-sort">{t("menu.sortLabel")}</label>
          <select id="menu-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="number">{t("menu.sortNumber")}</option>
            <option value="name">{t("menu.sortName")}</option>
            <option value="price">{t("menu.sortPrice")}</option>
          </select>
        </div>
      </div>

      <div className="chips" role="toolbar" aria-label={t("menu.filtersLabel")}>
        {FILTERS.map((id) => (
          <button
            key={id}
            type="button"
            className={filterId === id ? "chip is-active" : "chip"}
            aria-pressed={filterId === id}
            onClick={() => setFilterId(id)}
          >
            {dict.filters[id] || id}
          </button>
        ))}
      </div>

      <p className="result-count" aria-live="polite">
        {countLabel}
      </p>

      {items.length === 0 ? (
        <p className="empty-state">{t("menu.empty")}</p>
      ) : wide ? (
        <div className="table-wrap">
          <table className="menu-table">
            <thead>
              <tr>
                <th scope="col">{t("menu.colNumber")}</th>
                <th scope="col">{t("menu.colName")}</th>
                <th scope="col">{t("menu.colDescription")}</th>
                <th scope="col">{t("menu.colCategory")}</th>
                <th scope="col">{t("menu.colPrice")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, index) => (
                <tr key={rowKey(row, index)}>
                  <td className="num">{row.number || "–"}</td>
                  <th scope="row">{row.name}</th>
                  <td>{row.description}</td>
                  <td>{row.category}</td>
                  <td className="price">
                    {row.price} {t("common.currency")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ul className="dish-list">
          {items.map((row, index) => (
            <li className="dish-card" key={rowKey(row, index)}>
              <div className="dish-top">
                <span className="dish-num">{row.number || "–"}</span>
                <span className="dish-price">
                  {row.price} {t("common.currency")}
                </span>
              </div>
              <h3>{row.name}</h3>
              {row.description ? <p>{row.description}</p> : null}
              <p className="dish-cat">{row.category}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="menu-notes">
        <p>{t("menu.vat")}</p>
        <p>{t("menu.wish")}</p>
      </div>

      <section className="legend">
        <h2>{t("menu.legendTitle")}</h2>
        <div className="legend-grid">
          <div>
            <h3>{t("menu.legendAdditives")}</h3>
            <ul>
              {dict.menu.additives.map((entry) => (
                <li key={entry.code}>
                  <span>{entry.code}</span>
                  {entry.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{t("menu.legendAllergens")}</h3>
            <ul>
              {dict.menu.allergens.map((entry) => (
                <li key={entry.code}>
                  <span>{entry.code}</span>
                  {entry.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p>{t("menu.legendNote")}</p>
      </section>
    </div>
  );
}
