import SupportList from "../board/support/SupportList";
import useSearch from "../board/Search";
import { getSupportPosts } from "../board/SupportApi";
export default function MainSurpports() {
  const { data } = useSearch(getSupportPosts, undefined, 4);
  return (
    <div className="w-2/4">
      <p className="font-bold">공지사항 &gt;</p>
      <hr />
      <SupportList
        data={data}
        searchKeyword={""}
        currentPage={1}
        onTh={false}
        compact={true}
      ></SupportList>
    </div>
  );
}
