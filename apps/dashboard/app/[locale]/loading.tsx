import { LoadingSpinner } from "@repo/ui/components/loading-spinner";

const LoaderPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoadingSpinner />
    </div>
  );
};
LoaderPage.displayName = "LoaderPage";

export default LoaderPage;
