import { FunctionComponent, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FunctionComponent<PropsWithChildren> = (props) => {

  const user = false;

  if(!user) {
    return <Navigate to="/signin" replace />;
  };

  return <>{props.children}</>

}

export default ProtectedRoute;