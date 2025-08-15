import { useNavigate } from "react-router-dom";
export default function SupportList({
  data,
  currentPage,
  searchKeyword,
  onTh,
  compact = false,
}) {
  const navigate = useNavigate();
  const cellPadding = compact ? "px-2 py-1" : "px-4 py-2";
  return (
    <div className="">
      <table className="table">
        {/* head */}
        <thead>
          {onTh && (
            <tr>
              <th className="w-1/5">분류</th>
              <th className="w-3/5">제목</th>
              <th className="w-1/5">날짜</th>
            </tr>
          )}
        </thead>
        <tbody>
          {/* row 1 */}
          {data.map((post, idx) => (
            <tr
              key={post.id}
              className="cursor-pointer"
              onClick={() =>
                navigate(
                  `/support/${post.id}?page=${currentPage}&keyword=${searchKeyword}`
                )
              }
            >
              <th className={cellPadding}>{post.post_type}</th>
              <td className={cellPadding}>{post.title}</td>
              <td className={cellPadding}>{post.createdAt.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
