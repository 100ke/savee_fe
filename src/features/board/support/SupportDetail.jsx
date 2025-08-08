import "./../Board.css";
import Pagination from "../Pagination";
import PostHeader from "./SupportHeader";
import { useEffect, useState } from "react";
import { fetchPostById } from "../SupportApi";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

export default function SupportDetail() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

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
  return (
    <div className="container p-10 flex flex-col justify-cente h-screen">
      {/* <div className="card mb-4 w-3/4 m-auto"> */}
      <PostHeader></PostHeader>
      <div className="container shadow-md flex flex-wrap rounded-box gap-2 p-5 justify-between">
        <h2 className="font-medium">{post?.title}</h2>

        <small className="">{`작성일: ${
          post?.createdAt?.split("T")[0]
        }`}</small>
      </div>
      <div className="card-body shadow-md">
        <div className="mb-4">
          <p>{post?.content}</p>
        </div>
      </div>
      {/* </div> */}

      <div className="container flex m-auto flex-wrap justify-between p-5 mt-3">
        <a className="">이전글</a>
        <button
          className="btn join-item rounded-box w-20 support-submit"
          onClick={() => navigate(`/support?page=${currentPage}`)}
        >
          목록
        </button>

        <a>다음글</a>
      </div>
    </div>
  );
}
