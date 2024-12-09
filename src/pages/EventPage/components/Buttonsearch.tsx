export default function ButtonSearch({
  handleSearch,
}: {
  handleSearch: () => void;
}) {
  return (
    <div className="ml-3 rounded-md border border-black text-center">
      <button
        onClick={handleSearch}
        className="w-full rounded-md bg-black p-1.5 text-white"
      >
        Tìm kiếm
      </button>
    </div>
  );
}
