import React from "react";
import LoadingComponent from './LoadingComponent';

export default function lazyRouter(opts) {
  const LazyLoading = React.lazy(opts.loader);
  return (props) => (
    <React.Suspense fallback={<LoadingComponent />}>
      <LazyLoading {...props} />
    </React.Suspense>
  );
}
