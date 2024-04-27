import { ReactNode } from "react";

import Navbar from "~/components/sections/navbar";

import chatBubbles from "~/assets/illustrations/chat-bubbles.svg";

const PublicLayout = ({
  children,
  headerContent,
}: {
  children: ReactNode;
  headerContent?: ReactNode;
}) => {
  return (
    <>
      <header className="w-full">
        <Navbar />
        <div className="max-w-5xl mx-auto">{headerContent}</div>
      </header>
      <main className="">{children}</main>
      <footer>
        <div className="bg-blue-700">
          <div className="flex items-center max-w-5xl mx-auto justify-between py-3 px-4">
            <p className="font-nunito text-white font-semibold">
              Copyright &copy; {new Date().getFullYear()} | DS Data Solutions
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PublicLayout;
