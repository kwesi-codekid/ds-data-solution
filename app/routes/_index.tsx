import type { MetaFunction } from "@remix-run/node";
import { Button } from "@nextui-org/react";

import PublicLayout from "~/layouts/Public";
import ChooseUsSection from "~/components/sections/choose-us";
import Packages from "~/components/sections/packages";

import conversation from "~/assets/illustrations/conversation.svg";

export default function Index() {
  const header = (
    <div
      className={`flex items-center justify-between md:px-10 px-6 text-white dark:text-white h-[75vh]`}
    >
      <div className="flex-1 flex flex-col gap-6">
        <p className="text-slate-400 font-nunito font-bold text-xl">
          Look no further for
        </p>
        <h1 className="text-indigo-600 font-montserrat font-extrabold text-6xl lg:text-7xl mb-4">
          Affordable Data Packages
        </h1>
        <Button
          variant="ghost"
          className="border-indigo-600 hover:!bg-indigo-600 font-montserrat text-indigo-600 hover:text-white !font-semibold w-max px-12"
          radius="lg"
        >
          Buy Now
        </Button>
      </div>
      <div
        className="md:w-1/2 h-full bg-no-repeat bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: `url(${conversation})`,
        }}
      ></div>
    </div>
  );

  return (
    <PublicLayout headerContent={header}>
      <div>
        <Packages />
        <ChooseUsSection />
      </div>
    </PublicLayout>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
