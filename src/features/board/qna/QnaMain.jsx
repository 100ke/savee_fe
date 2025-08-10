import QnaTab from "./QnaTabs";
import QnaList from "./QnaList";
import QnaSearchBar from "../searchBar/QnaSearchBar";
export default function QnaMain() {
  return (
    <div className="pb-10">
      <section className="flex flex-col gap-6 mb-7">
        <h1 className="text-xl text-center">Qna</h1>
        <div className="flex flex-col gap-6">
          {/* <QnaSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
            handleSearch={handleSearch}
          ></QnaSearchBar> */}
          <QnaTab></QnaTab>
          <QnaList></QnaList>
        </div>
      </section>
    </div>
  );
}
