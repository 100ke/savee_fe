export default function SupportSearchBar({
  searchKeyword,
  setSearchKeyword,
  handleSearch,
}) {
  return (
    <>
      <div className="flex gap-1 container w-full max-w-full">
        <input
          className="input join-item rounded-box flex-grow h-13"
          placeholder="검색어를 입력하세요."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <div className="indicator">
          <button
            className="btn join-item custom-search-btn rounded-box"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
