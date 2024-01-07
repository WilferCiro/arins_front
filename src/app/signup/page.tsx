import SignUpForm from "@/presentation/components/organisms/SignUpForm";
import style from "./style.module.css";

const SignupPage = () => {
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
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignupPage;
