import Layout from "../../components/layout-login";
import Styles from "../../styles/Login.module.css";
import Image from "next/image";

export default function Login() {
  const loginUser = (event) => {
    event.preventDefault();
    console.log(event);
  };
  return (
    <Layout>
      <div className={Styles.pageContainer}>
        <div className={Styles.header}>
          <div className={Styles.headerLogo}>
            <Image
              src="/iam.png"
              alt="IAMBlockchain Logo"
              width={160}
              height={160}
            />
          </div>
        </div>
        <div className={Styles.container}>
          <div className={Styles.formHeader}>
            <p>Sign in to IAMBlockchain</p>
          </div>
          <div className={Styles.formBody}>
            <form onSubmit={loginUser}>
              <div className={Styles.formInput}>
                <label>Username or email address</label>
                <input
                  type="text"
                  className={`${Styles.input} ${Styles.inputBlock}`}
                  name="username"
                  autoComplete="off"
                  required
                />
              </div>
              <div className={Styles.positionRelative}>
                <div className={Styles.formInput}>
                  <label>Password</label>
                  <input
                    type="password"
                    className={`${Styles.input} ${Styles.inputBlock}`}
                    name="password"
                  />
                  <a href="#" className={Styles.forgot}>
                    Forgot password?
                  </a>
                </div>
                <input
                  type="submit"
                  value="Sign in"
                  className={Styles.signinBtn}
                />
              </div>
            </form>
          </div>
          <div className={Styles.createAcount}>
            New to IAMBlockchain ? <a href="/register">Create an account.</a>
          </div>
        </div>

        <div className={Styles.footer}>
          <ul>
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Security</a>
            </li>
            <li>
              <a href="#">Contact IAMBlockchain</a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
