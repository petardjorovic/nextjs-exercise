import Link from "next/link";
import React from "react";
import Logo from "./Logo";

function Navigation() {
  return (
    <header className="bg-cyan-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-6 bg-cyan-900">
        <Logo />
        <nav>
          <ul className="flex gap-x-8 items-center">
            <li>
              <Link href={"/cabins"}>Cabins</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/profile"}>Guest page</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
