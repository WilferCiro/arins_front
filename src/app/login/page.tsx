import style from "./style.module.css";
import LoginForm from "@/presentation/components/organisms/LoginForm";

const LoginPage = () => {
  return (
    <div className={style.login}>
      <ul className={style.squares}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className={style.form_container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
