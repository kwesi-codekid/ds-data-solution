import ThemeSwitcher from "../ui/theme-switcher";

const Navbar = () => {
  return (
    <nav className="backdrop-blur-sm bg-indigo-700 h-16 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-full">
        <h3 className="font-poppins font-extrabold text-white text-xl">
          DS Data Solutions
        </h3>

        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
