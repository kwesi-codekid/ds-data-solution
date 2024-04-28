import Navbar from "~/components/sections/navbar";
import { Input, Button } from "@nextui-org/react";
import { Form } from "@remix-run/react";
import monetizationIllustration from "~/assets/illustrations/monetization.svg";

const AdminLogin = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <section className="flex flex-col gap-4">
        <header>
          <Navbar showAdminButton={false} />
        </header>
        <main>
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="flex justify-center items-center">
              <img
                className="w-[80%] md:w-3/4"
                src={monetizationIllustration}
                alt="illustration"
              />
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="font-montserrat font-bold text-4xl dark:text-white text-slate-800">
                Sign In To Admin Dashboard
              </h2>
              <Form className="flex flex-col gap-5">
                <Input label="Email" name="email" type="email" required />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <Button
                  type="submit"
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

export default AdminLogin;
