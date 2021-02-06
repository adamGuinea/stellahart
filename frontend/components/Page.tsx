import React from 'react';
import { IChildren } from '../interfaces';
import Header from './Header';

export default function Page({ children }: IChildren) {
  return (
    <div>
      <Header />
      <h2>I am a page component</h2>
      {children}
    </div>
  );
}
