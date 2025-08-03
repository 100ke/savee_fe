import "./NavBar.css";
import IconCalender from "./../assets/calendar3.svg";
export default function NavBar() {
  const menuItems = [
    { label: "달력", path: "/", icon: IconCalender },
    { label: "가계부", path: "/", icon: IconCalender },
    { label: "통계", path: "/", icon: IconCalender },
    { label: "공유 가계부", path: "/", icon: IconCalender },
    { label: "소비 분석", path: "/", icon: IconCalender },
    { label: "내 정보", path: "/", icon: IconCalender },
  ];

  return (
    <div className="border-r sidebar w-48 h-screen flex flex-col justify-between">
      <div className="p-4 flex items-center justify-center">
        <p className="h-48px">logo</p>
      </div>
      <ul className="menu [&_li>*]:rounded-none p-0 w-48 custom-side-menu">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <a
              href={item.path}
              className="p-4 text-base flex items-center gap-2"
            >
              <img src={item.icon} alt="달력" className="w-5 h-5" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-auto text-center p-4">
        <a className="cursor-pointer logout text-sm">로그아웃</a>
      </div>
    </div>
  );
}
