import SupportList from "./SupportList";
export default function SupportMain() {
  return (
    <div>
      <section className="flex flex-col gap-6 mb-7">
        <h1 className="text-xl text-center">고객센터</h1>
        <div className="flex flex-col gap-6">
          <div className="container ounded-box grow gap-1 justify-center flex flex-warp p-1">
            <div className="basis-1/2 gap-1 border-r-[var(--black30)] border-r">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 inline mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                <p className="inline ml-1">전화 문의</p>
              </div>
              <div className="p-3 text-sm">
                <p>02-258-9842</p>
                <small className="block text-[var(--black70)]">
                  평일 09:00 ~ 18:00 가능
                </small>
              </div>
            </div>
            <div className="basis-1/2 gap-1 ml-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 inline mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <p className="inline ml-1 ">이메일 문의</p>
              </div>
              <div className="p-3 text-sm">
                <a href="mailto:savee@savee.com">savee@savee.com</a>
                <small className="block text-[var(--black70)]">
                  24시간 접수 가능
                </small>
              </div>
            </div>
          </div>
          <div className="container cursor-pointer text-[var(--main-color-dark)] border border-[var(--main-color-dark)] rounded-box shadow-md p-5 m-auto">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
              <span className="font-semibold">Qna</span>

              <small className="ml-1">
                궁금한 점이 있으시면 답변 드리겠습니다
              </small>

              <small className="ml-auto cursor-pointe text-[var(--black70)]">
                문의 남기러 가기 &gt;
              </small>
            </div>
          </div>
        </div>
      </section>
      <SupportList></SupportList>
    </div>
  );
}
