import { IChildren } from '../interfaces';

export default function Page({ children }: IChildren) {
  return (
    <div>
      <h2>I am a page component</h2>
      {children}
    </div>
  );
}
