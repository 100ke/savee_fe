import "./../Board.css";
import Pagination from "../Pagination";
export default function SupportDetail() {
return(
    <div className="container p-10 flex flex-col justify-center">
      <div className="card mb-4 w-3/4 m-auto">
      <h2 className="text-xl text-center">공지사항</h2>
        <div className="card-header shadow-md flex flex-wrap rounded-box gap-2 p-5">
          <h2 className="">aaa</h2>
          <div className="text-muted flex flex-wrap">
            <small className="">작성일: aaa</small>
          </div>
        </div>
        <div className="card-body border">
          <div className="mb-4">
            <p>fsfsdfs</p>
          </div>
          
        </div>
        <div className="card-footer d-flex justify-content-between">
          <div>
          </div>
          
        </div>
      </div>

      <div className="card flex m-auto flex-wrap w-3/4 justify-between">
        
          <a>이전</a>
        <button>목록</button>
        <div className="card">
          <a>다음</a>
        </div>
      </div>
    </div>
)
}