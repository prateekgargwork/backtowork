import { Link, useLocation } from "wouter";
import { Home, Bell, Clock } from "lucide-react";

const NavLink = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: React.ComponentType }) => {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <a className={`px-4 py-2 font-bold text-base border-2 border-black flex items-center gap-2 transition-transform hover:translate-y-[-2px] ${
        isActive 
          ? "bg-primary text-white" 
          : "bg-white text-black hover:bg-gray-100"
      }`}>
        <Icon size={16} />
        {children}
      </a>
    </Link>
  );
};

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#f0f0f0] border-b-4 border-black p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold uppercase">backtowork</h1>
          <div className="flex gap-2 justify-center">
            <NavLink href="/" icon={Home}>HOME</NavLink>
            <NavLink href="/notifications" icon={Bell}>NOTIFY</NavLink>
            <NavLink href="/schedule" icon={Clock}>TIME</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}