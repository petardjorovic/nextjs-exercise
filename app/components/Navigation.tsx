import Image from "next/image";
import Link from "next/link";
import React from "react";

function Navigation() {
  return (
    <header>
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="logo" width={45} height={45} />
      </Link>
      <nav>
        <ul>
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
    </header>
  );
}

export default Navigation;
