import React from "react";

interface BreadCrumbProps {
  breads: string[];
}

const BreadCrumb = ({ breads }: BreadCrumbProps) => {
  return (
    <div className="flex mb-10">
      {/* <p className="font-medium">Home &gt; Fake checker</p> */}

      {breads.map((bread: string, index: number) => {
        return (
          <div key={index} className="">
            <p className="font-medium">
              {bread} {index !== breads.length - 1 && <span className="mx-2"> &gt; </span>}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
