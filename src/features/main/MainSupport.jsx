import SupportList from "../board/support/SupportList";
import useSearch from "../board/Search";
import { getSupportPosts } from "../board/SupportApi";
import { useNavigate } from "react-router-dom";
export default function MainSurpports() {
  const { data } = useSearch(getSupportPosts, undefined, 5);
  const navigate = useNavigate();
  return (
    <div className="w-2/4 flex flex-col gap-1">
      <p
        className="font-bold container w-full cursor-pointer text-[var(--main-color)]"
        onClick={() => navigate("/support")}
      >
        공지사항 <span className="">&gt;</span>
      </p>
      <hr className="text-[var(--black20)]" />
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
