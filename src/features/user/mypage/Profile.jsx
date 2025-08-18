import { FaUserAlt } from "react-icons/fa";

function Profile({ user }) {
  if (!user) {
    return <div>사용자 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="profile my-3 flex mb-10 flex-col sm:flex-row">
      <div className="avatar avatar-placeholder mb-5 sm:mb-0 mx-auto sm:mx-0">
        <div className="profile-circle text-neutral-content w-24 rounded-full">
          <span className="text-6xl user">
            <FaUserAlt />
          </span>
        </div>
      </div>
      <div className="user-info sm:ml-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
        <p className="text-xl">{user.email}</p>
      </div>
    </div>
  );
}

export default Profile;
