import { Outlet, NavLink } from "react-router-dom";

function Layout() {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/FAQ", label: "FAQ" },
  ];
  const linkStyle =
    "px-5 py-2 rounded-xl font-semibold text-base tracking-wide transition duration-400 ease-in-out hover:scale-105 hover:bg-primary-500";
  return (
    <div className="flex flex-col min-h-screen">
      {/* navigation bar */}
      <div className="flex flex-row gap-3 justify-center md:justify-end w-full md:pr-10 py-3 font-semibold text-primary-50 bg-primary-400">
        {navLinks.map((nl) => (
          <NavLink
            key={"navLink" + nl.path}
            to={nl.path}
            end={nl.path === "/"}
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? "underline underline-offset-8 decoration-2" : ""}`
            }
          >
            {nl.label}
          </NavLink>
        ))}
      </div>
      {/* page content */}
      <div className="px-6 md:px-24 pt-6 pb-18 bg-primary-100 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
