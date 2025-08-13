export default function MainAnalysis(){
    return(
        <div >
            <div className="w-1/5"></div>
            <div className="container bg-[var(--main-color-lightest)] justify-between flex flex-row p-3 rounded-box">
                <p className="ml-4 font-bold">AI 분석 소비 리포트</p>
                <p className=""><span className="mr-2 text-[var(--error-color)]"> New</span>지난 달보다 소비가 25% 증가하였습니다.<span className="text-[var(--error-color)] ml-2">&gt;</span></p>
                
            </div>
        </div>
    )
}