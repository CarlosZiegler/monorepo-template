import React from "react";

const NotFoundPage = async () => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col items-center p-20 rounded-lg border-[1px] bg-pr-500/10 border-pr-400/20 m-2 md:md-0">
        <div className="mt-16 flex flex-col items-center">
          <h1 className="text-2xl md:text-5xl mb-2 font-semibold text-center">
            NOT FOUND
          </h1>
        </div>
      </div>
    </div>
  );
};

NotFoundPage.displayName = "NotFoundPage";

export default NotFoundPage;
