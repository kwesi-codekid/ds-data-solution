import Navbar from "~/components/sections/navbar";
import { Input, Button } from "@nextui-org/react";
import { Form } from "@remix-run/react";
import monetizationIllustration from "~/assets/illustrations/monetization.svg";
import { useState } from "react";
import { EyeSlashFilledIcon } from "~/components/icons/EyeFilled";
import { EyeFilledIcon } from "~/components/icons/EyeSlash";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import AdminController from "~/controllers/AdminController.server";
import UserController from "~/controllers/UserController";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="h-screen flex flex-col justify-between">
      <section className="flex flex-col gap-4">
        <header>
          <Navbar showAdminButton={false} />
        </header>
        <main>
          <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row md:gap-5">
            <div className="flex justify-center items-center md:w-1/2">
              <img
                className="w-[80%] md:w-[90%]"
                src={monetizationIllustration}
                alt="illustration"
              />
            </div>
            <div className="flex flex-col md:justify-center gap-8 md:flex-1 h-full md:pt-16">
              <h2 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl dark:text-white text-slate-800">
                Sign In To Your Account
              </h2>
              <Form
                method="POST"
                id="login-form"
                className="flex flex-col gap-5 md:w-[80%]"
              >
                <Input
                  label="Email"
                  name="email"
                  className="font-nunito"
                  classNames={{
                    label: "font-montserrat font-medium",
                    inputWrapper: "border-blue-500",
                  }}
                  type="email"
                  variant="bordered"
                  color="primary"
                  required
                />
                <Input
                  label="Password"
                  name="password"
                  className="font-nunito"
                  classNames={{
                    label: "font-montserrat font-medium",
                    inputWrapper: "border-blue-500",
                  }}
                  variant="bordered"
                  color="primary"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  required
                />
                <Button
                  type="submit"
                  form="login-form"
                  className="w-full font-montserrat font-medium text-xl"
                  size="lg"
                  color="primary"
                  radius="md"
                >
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </main>
      </section>

      <footer>
        <div className="bg-blue-700">
          <div className="flex items-center max-w-5xl mx-auto justify-between py-3 px-4">
            <p className="font-nunito text-white font-semibold">
              Copyright &copy; {new Date().getFullYear()} | DS Data Solutions
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const userController = await new UserController(request);
  return await userController.login(email, password);
};

export const loader: LoaderFunction = async ({ request }) => {
  const adminController = await new AdminController(request);
  return (await adminController.getAdmin()) ? redirect("/") : null;
};
