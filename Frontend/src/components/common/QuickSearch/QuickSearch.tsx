import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../Icon/Icon";

export default function QuickSearch() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  return (
    <form
      role="search"
      aria-label="Tìm dịch vụ"
      className="relative flex items-center"
      onSubmit={(event) => {
        event.preventDefault();
        navigate(`/?q=${encodeURIComponent(query.trim())}#detailed-services`);
      }}
    >
      <label className="sr-only" htmlFor="quick-search">
        Tìm kiếm nhanh
      </label>
      <input
        id="quick-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="text-xs bg-white border border-slate-200 text-slate-700 placeholder-slate-400 rounded-full py-2 pl-4 pr-10 w-48 sm:w-56 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs transition"
        placeholder="Tìm kiếm nhanh"
        type="search"
      />
      <button
        type="submit"
        aria-label="Tìm kiếm dịch vụ"
        className="absolute right-0 top-0 bottom-0 w-11 flex items-center justify-center text-slate-400 text-xs"
      >
        <Icon name="fa-magnifying-glass" className="stitch-icon" />
      </button>
    </form>
  );
}
