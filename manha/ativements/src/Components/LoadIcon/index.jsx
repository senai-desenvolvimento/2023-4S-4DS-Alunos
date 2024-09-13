import React from "react";
import { Puff } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <Puff
      visible={true}
      height="20"
      width="20"
      color="#fafafa"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
    />
  );
};

export default LoadingSpinner;
