import "./../Board.css";
import Pagination from "../Pagination";
import PostHeader from "./SupportHeader";
export default function SupportDetail() {
return(
    <div className="container p-10 flex flex-col justify-center">
      {/* <div className="card mb-4 w-3/4 m-auto"> */}
      <PostHeader></PostHeader>
        <div className="container shadow-md flex flex-wrap rounded-box gap-2 p-5 justify-between">
          <h2 className="font-medium">안녕하세요</h2>
          
            <small className="">작성일: 2025-04-01</small>

        </div>
        <div className="card-body">
          <div className="mb-4">
            <p>fsfsdfs</p>
          </div>
          
        </div>
      {/* </div> */}

      <div className="container flex m-auto flex-wrap justify-between">
        
          <a className="">이전글</a>
        <button className="btn join-item rounded-box w-20 support-submit">목록</button>
        
          <a>다음글</a>

      </div>
    </div>
)
}