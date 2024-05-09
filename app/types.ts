export type PackageInterface = {
  _id: string;
  title: string;
  bannerImage: string;
  description: string;
  bundles: BundleInterface[];
  createdAt: string;
};

export type BundleInterface = {
  _id: string;
  package: PackageInterface;
  volume: number;
  price: number;
  agentPrice: number;
};

export type AdminNavLinkInterface = {
  path: string;
  icon: JSX.Element;
  label: string;
};

export type PaystackButtonProps = {
  formData: {
    fullName: string;
    email: string;
    amount: number;
    beneficiaryNumber: string;
    bundle: string;
    intent: string;
  };
};

export type OrderInterface = {
  _id: string;
  fullName: string;
  email: string;
  amount: number;
  beneficiaryNumber: string;
  bundle: BundleInterface;
  package: PackageInterface;
  status: OrderStatus;
  createdAt: string;
};

export type OrderStatus = "pending" | "processed";

export type AdminInterface = {
  _id: string;
  email: string;
  fullName: string;
  password: string;
};

export type UserInterface = {
  _id: string;
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  userType: "agent" | "user";
  createdAt: string;
};
