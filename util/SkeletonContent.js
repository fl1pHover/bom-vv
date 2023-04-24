import { Skeleton } from '@chakra-ui/react';

const SkeletonContent = ({ load }) => {
  return (
    <div className="grid grid-cols-2 gap-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3">
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
      <Skeleton className="md:min-h-[35vh] min-h-[30vh]" isLoaded={load} />
    </div>
  );
};

export default SkeletonContent;
