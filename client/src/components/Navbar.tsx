import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Bot } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-100 transition ${
      location.pathname === path ? "bg-blue-200 text-blue-900 font-semibold" : "text-blue-700"
    }`;

  return (
    <nav className="bg-white shadow-md p-4 flex gap-4 justify-center">
      <Link to="/" className={linkClasses("/")}>
        <LayoutDashboard size={20} />
        Dashboard
      </Link>
      <Link to="/assistant" className={linkClasses("/assistant")}>
        <Bot size={20} />
        Assistant
      </Link>
    </nav>
  );
}

export default Navbar;
