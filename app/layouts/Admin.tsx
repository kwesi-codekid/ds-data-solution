import { ReactNode, useState } from "react";
import { Link, useLocation } from "@remix-run/react";
import { Button } from "@nextui-org/react";
import { adminNavLinks } from "~/data/nav-links";
import { AdminNavLinkInterface } from "~/types";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);

  return (
    <section className="md:h-screen flex gap-4 p-2">
      <aside
        className={`h-full relative flex flex-col justify-between bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl overflow-hidden ${
          isDesktopExpanded ? "w-[17%] px-4 py-3" : "w-16 p-2"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col gap-2">
          {adminNavLinks.map((link: AdminNavLinkInterface, index: number) => (
            <Link
              key={index}
              to={link.path}
              className={`flex items-center ${
                isDesktopExpanded ? "" : "justify-center"
              } gap-2 p-2 text-white font-nunito rounded-xl ${
                pathname === link.path ? "bg-indigo-500" : ""
              }`}
            >
              {link.icon}
              {isDesktopExpanded && <span>{link.label}</span>}
            </Link>
          ))}
        </div>
      </aside>

      <section className="flex-1 h-full flex flex-col gap-4">
        <header className="bg-indigo-600 flex items-center justify-between py-2 px-4 pl-2 rounded-2xl">
          <div className="flex items-center gap-3">
            {isDesktopExpanded ? (
              <Button
                isIconOnly
                variant="light"
                className="text-white"
                onClick={() => setIsDesktopExpanded(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M17 4H3V6H17V4ZM13 11H3V13H13V11ZM17 18H3V20H17V18ZM22.0104 8.81412L20.5962 7.3999L16 11.9961L20.5962 16.5923L22.0104 15.1781L18.8284 11.9961L22.0104 8.81412Z"></path>
                </svg>
              </Button>
            ) : (
              <Button
                isIconOnly
                variant="light"
                className="text-white"
                onClick={() => setIsDesktopExpanded(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M20.9997 4H6.99967V6H20.9997V4ZM20.9997 11H10.9997V13H20.9997V11ZM20.9997 18H6.99967V20H20.9997V18ZM1.98926 8.81412L3.40347 7.3999L7.99967 11.9961L3.40347 16.5923L1.98926 15.1781L5.17124 11.9961L1.98926 8.81412Z"></path>
                </svg>
              </Button>
            )}
            <h3 className="font-montserrat font-bold text-white text-3xl">
              {adminNavLinks.find((link) => link.path === pathname)?.label}
            </h3>
          </div>
        </header>

        <main className="flex-1 rounded-2xl">{children}</main>
      </section>
    </section>
  );
};

export default AdminLayout;
