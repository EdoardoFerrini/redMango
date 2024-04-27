import jwtDecode from "jwt-decode";
import { SD_Roles } from "../Utility/SD";
import withAuth from "./withAuth";

const withAdminAuth = (Wrappedcomponent: any) => {
  return (props: any) => {
    console.log("HOC Called");
    const accessToken = localStorage.getItem("token") ?? "";

    if (accessToken) {
      const decode: {
        role: string;
      } = jwtDecode(accessToken);

      if (decode.role !== SD_Roles.ADMIN) {
        window.location.replace("/accessDenied");
        return null;
      }
    } else {
      window.location.replace("/login");
      return null;
    }

    return <Wrappedcomponent {...props} />;
  };
};

export default withAdminAuth;
