const withAuth = (Wrappedcomponent: any) => {
  return (props: any) => {
    console.log("HOC Called");
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      window.location.replace("/login");
      return null;
    }
    return <Wrappedcomponent {...props} />;
  };
};

export default withAuth;
