import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Input,
  Select,
  SelectItem,
  Button,
  SelectedItems,
  Chip,
} from "@nextui-org/react";
import PackageController from "~/controllers/PackageController";
import PublicLayout from "~/layouts/Public";
import { BundleInterface, PackageInterface, UserInterface } from "~/types";
import { useEffect, useState } from "react";
import PaystackButton from "~/components/ui/paystack-button";
import OrderController from "~/controllers/OrderController";
import UserController from "~/controllers/UserController";

const PurchaseDetail = () => {
  const { dataValue, pkg, bundles, user } = useLoaderData<{
    dataValue: string;
    pkg: PackageInterface;
    bundles: BundleInterface[];
    user: UserInterface;
  }>();

  const [value, setValue] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<number>();
  useEffect(() => {
    const price = bundles.find((bundle) => bundle._id === value)?.price;
    setSelectedPrice(price);
  }, [value]);

  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    amount: number;
    beneficiaryNumber: string;
    bundle: string;
    intent: string;
    package: string;
  }>({
    fullName: user.fullName,
    email: user.email,
    amount: selectedPrice || 0,
    beneficiaryNumber: "",
    bundle: "",
    intent: "checkout",
    package: dataValue,
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, amount: selectedPrice || 0 }));
  }, [selectedPrice]);

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto py-20 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="rounded-3xl border-[10px] border-indigo-100 overflow-hidden">
          <img
            src={pkg.bannerImage}
            alt={pkg.title}
            className="w-full hover:scale-110 transition-all duration-400 ease-in-out cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-montserrat text-lg font-semibold text-indigo-600 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-7"
            >
              <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
            Checkout
          </p>

          <h2 className="font-montserrat font-bold text-3xl lg:text-5xl text-slate-700">
            {pkg.title}
          </h2>

          <p className="font-nunito text-slate-500">{pkg.description}</p>

          <div>
            <Form
              id="checkout-form"
              className="flex flex-col gap-5"
              method="POST"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  classNames={{
                    label: "font-montserrat mb-2",
                    input: "font-nunito text-lg font-semibold mt-2",
                  }}
                  color="primary"
                  variant="flat"
                  name="fullName"
                  label="Full Name"
                  value={formData.fullName}
                  onValueChange={(value) => {
                    setFormData({ ...formData, fullName: value });
                  }}
                />
                <Input
                  classNames={{
                    label: "font-montserrat mb-2",
                    input: "font-nunito text-lg font-semibold mt-2",
                  }}
                  color="primary"
                  variant="flat"
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onValueChange={(value) => {
                    setFormData({ ...formData, email: value });
                  }}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  classNames={{
                    label: "font-montserrat mb-2",
                    input: "font-nunito text-lg font-semibold mt-2",
                  }}
                  color="primary"
                  variant="flat"
                  name="beneficiaryNumber"
                  label="Beneficiary Number"
                  type="tel"
                  value={formData.beneficiaryNumber}
                  onValueChange={(value) => {
                    setFormData({ ...formData, beneficiaryNumber: value });
                  }}
                />
                <Select
                  items={bundles}
                  name="bundle"
                  label="Select Bundle"
                  color="primary"
                  variant="flat"
                  classNames={{
                    label: "font-montserrat mb-2",
                  }}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setFormData({ ...formData, bundle: e.target.value });
                  }}
                  renderValue={(bundles: SelectedItems<BundleInterface>) => {
                    return bundles.map((bundle, index: number) => (
                      <Chip color="primary" variant="flat" key={index}>
                        <p className="font-nunito flex items-center gap-2 font-bold">
                          {bundle?.data?.volume}GB
                        </p>
                      </Chip>
                    ));
                  }}
                >
                  {(bundle) => (
                    <SelectItem key={bundle._id} textValue={bundle._id}>
                      <p>{bundle.volume} GB</p>
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPrice && (
                  <Input
                    className="!bg-transparent"
                    classNames={{
                      inputWrapper: "!bg-transparent !shadow-none",
                      input: "text-2xl font-montserrat font-semibold",
                    }}
                    value={`GH ${selectedPrice.toFixed(2)}`}
                  />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PaystackButton formData={formData} />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PurchaseDetail;

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);
  const formData = await request.formData();

  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const amount = formData.get("amount") as string;
  const beneficiaryNumber = formData.get("beneficiaryNumber") as string;
  const bundle = formData.get("bundle") as string;
  const intent = formData.get("intent") as string;
  const packageId = formData.get("package") as string;

  const orderController = new OrderController(request);
  const response = await orderController.createOrder({
    fullName,
    email,
    amount: Number(amount),
    beneficiaryNumber,
    bundle,
    package: packageId,
  });

  return response;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { dataValue } = params;

  const userController = new UserController(request);
  await userController.requireUserId();
  const user = await userController.getUser();

  const packageController = new PackageController(request);
  const pkg = await packageController.getPackageById({
    packageId: dataValue || "",
  });
  const bundles = await packageController.getPackageBundles({
    packageId: dataValue || "",
  });

  return {
    dataValue,
    pkg,
    bundles,
    user,
  };
};
