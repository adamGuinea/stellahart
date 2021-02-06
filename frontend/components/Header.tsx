import React from 'react';
import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header>
      <div className="bar">
        <Link href="/">Stellahart</Link>
      </div>
      <Nav />
      <div className="sub-bar">Search</div>
    </header>
  );
}
