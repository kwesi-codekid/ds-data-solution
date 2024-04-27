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
    bundleId: string;
    intent: string;
  };
};
