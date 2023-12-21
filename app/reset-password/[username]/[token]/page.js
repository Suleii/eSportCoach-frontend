import ResetPassword from '../../../../components/ResetPassword';

function ResetPasswordPage({params}) {
  return <ResetPassword username={params.username} token={params.token}/>;
}

export default ResetPasswordPage;