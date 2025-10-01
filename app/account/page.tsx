import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest area",
};

function Profile() {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, Petar
      </h2>
    </div>
  );
}

export default Profile;
