import React, { useEffect, useState } from "react";
import { getMyQnAList } from "../userApi";
import QnaTab from "../../board/qna/QnaTabs";
import QnaList from "../../board/qna/QnaList";
import { useSearchParams } from "react-router-dom";

function MyQnAList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("qna_type") || "";

  useEffect(() => {
    const fetchMyQna = async () => {
      try {
        const response = await getMyQnAList();
        setData(response.data || []);
      } catch (error) {
        setError("내 QnA를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyQna();
  }, []);

  const filteredData =
    category && category !== ""
      ? data.filter((post) => post.qna_type === category)
      : data;

  return (
    <section className="flex flex-col gap-6 mb-10 w-3/4">
      <h1 className="text-3xl">내가 작성한 질문</h1>
      <div className="flex flex-col gap-1">
        <QnaTab category={category} />
        <QnaList
          data={filteredData}
          loading={loading}
          error={error}
          admin={false}
          currentPage={1}
          totalPages={1}
          onPageChange={() => {}}
          pageParam={1}
          onRefresh={() => {}}
        ></QnaList>
      </div>
    </section>
  );
}

export default MyQnAList;
