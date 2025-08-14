import SupportList from "../board/support/SupportList"
export default function MainSurpports(){
    return(
            <div className="w-2/4">
            
                <p className="font-bold">공지사항 &gt;</p>
                <hr />

                <p className=""><span className="mr-2 text-[var(--error-color)]"> New</span>지난 달보다 소비가 25% 증가하였습니다.<span className="text-[var(--error-color)] ml-2">&gt;</span></p>
                {/* <SupportList></SupportList> */}
                </div>
    )
}