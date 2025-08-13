import "./../Board.css";
// import Pagination from "../Pagination";
import PostHeader from "./SupportHeader";
import { useEffect, useState } from "react";
import { fetchPostById, isAdmin, deletePost } from "../SupportApi";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function SupportDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [admin, setAdmin] = useState(false);
  const currentPage = searchParams.get("page") || 1;
  const keywordParam = searchParams.get("keyword") || "";
  useEffect(() => {
    async function checkAdmin() {
      const result = await isAdmin();
      setAdmin(result);
    }
    checkAdmin();
  }, []);
  console.log("admin", admin);
  //로드
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const data = await fetchPostById(id);
        const post = data.data;
        console.log("응답 내용:", post);
        // console.log(posts);
        if (!post) return <div>게시글이 없습니다.</div>;
        setPost(post);
      } catch (err) {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
        setError("게시글을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, []);

  //삭제
  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        alert("게시글이 삭제되었습니다.");
        navigate(`/support?page=${currentPage}`);
      } catch (error) {
        alert("삭제 중 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };
  return (
    <div className="container p-10 flex flex-col justify-cente h-screen">
      {/* <div className="card mb-4 w-3/4 m-auto"> */}
      <PostHeader></PostHeader>
      <div className="container flex flex-col">
        <small className="mb-1 ml-2 border border-[var(--accent-color)] p-1 w-16 card text-[var(--accent-color)] items-center">
          {post?.post_type}
        </small>
        <div className="flex flex-wrap justify-between shadow-md rounded-box gap-2 p-5 ">
          <h2 className="font-medium">{post?.title}</h2>
          <small className="flex items-center justity-center">{`${
            post?.createdAt?.split("T")[0]
          }`}</small>
        </div>
      </div>
      <div className="card-body shadow-md">
        <div className="mb-4">
          <p>{post?.content}</p>
        </div>
      </div>
      {/* </div> */}

      <div className="container flex m-auto flex-wrap justify-between p-5 mt-3">
        <a href="#" className="">
          이전글
        </a>
        <button
          className="btn join-item rounded-box w-20 support-submit"
          onClick={() =>
            navigate(`/support?page=${currentPage}&keyword=${keywordParam}`, {
              state: { refresh: true },
            })
          }
        >
          목록
        </button>
        {admin && (
          <button
            className="btn join-item custom-search-btn rounded-box text-white"
            onClick={() => navigate(`/support/edit/${id}`)}
          >
            수정
          </button>
        )}
        {admin && (
          <button
            className="btn join-item custom-search-btn rounded-box text-white"
            onClick={handleDelete}
          >
            삭제
          </button>
        )}
        <a href="#">다음글</a>
      </div>
    </div>
  );
}
