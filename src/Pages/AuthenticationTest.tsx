import withAuth from "../HOC/withAuth";


function AuthenticationTest() {
  return <div>This page can be accessed by any logged user</div>;
}

export default withAuth(AuthenticationTest);
