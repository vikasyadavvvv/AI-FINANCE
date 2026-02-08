import SignUpForm from "./_component/signup-form";
import AuthSidePanel from "./_component/auth-side-panel";
import Logo from "@/components/logo/logo";

const SignUp = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 md:pt-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo url="/" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="sm:w-full lg:w-[60%]">
            <SignUpForm />
          </div>
        </div>
      </div>
      <AuthSidePanel />
    </div>
  );
};

export default SignUp;
