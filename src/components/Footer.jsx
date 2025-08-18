import React from "react";
import { IoIosMail } from "react-icons/io";
import { SiNotion } from "react-icons/si";
import Logo from "../assets/savee.png";

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
      <aside>
        <img src={Logo} alt="savee_logo" className="w-[48px] h-[48px]" />
        <p>
          SAVEE Industries Ltd.
          <br />
          Providing reliable tech since 2025
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover" href="/ledger">
          가계부
        </a>
        <a className="link link-hover" href="/statistics">
          통계
        </a>
        <a className="link link-hover" href="/analysis">
          소비 분석
        </a>
        <a className="link link-hover" href="/support">
          고객 센터
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover" href="https://github.com/100ke">
          100ke
        </a>
        <a className="link link-hover" href="https://github.com/kdavin">
          kdavin
        </a>
        <a className="link link-hover" href="https://github.com/mnxx2">
          mnxx2
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Contact</h6>
        <div className="grid grid-flow-col gap-4 items-center">
          <a href="mailto:wesavee98s@gmail.com">
            <span className="text-3xl">
              <IoIosMail />
            </span>
          </a>
          <a href="https://www.youtube.com/@Savee98s">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <span className="text-2xl">
              <SiNotion />
            </span>
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
