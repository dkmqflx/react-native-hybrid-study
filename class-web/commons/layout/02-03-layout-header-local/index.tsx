import { HeaderGlobal } from "./header";

export default function LayoutGlobalAndLocal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderGlobal />
      <div>{children}</div>
    </>
  );
}
