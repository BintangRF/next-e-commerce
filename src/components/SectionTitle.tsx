import React from "react";

interface SectionTitleProps {
  preTitle?: string;
  title?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export const SectionTitle = ({
  preTitle,
  title,
  align = "center",
  children,
}: Readonly<SectionTitleProps>) => {
  const alignmentClass =
    align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex w-full flex-col mt-6 ${alignmentClass}`}>
      {preTitle && (
        <span className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
          {preTitle}
        </span>
      )}

      {title && (
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
          {title}
        </h2>
      )}

      {children && (
        <div className="mt-3 max-w-2xl text-base text-gray-600 lg:text-lg">
          {children}
        </div>
      )}
    </div>
  );
};
