import React from 'react';

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-lvh w-full">
        <div className="w-[200px] h-full bg-gray-200">sidebar</div>
        <div className="flex justify-center w-full relative">
          {children}
          {modal}
        </div>
      </div>
    </>
  );
}
