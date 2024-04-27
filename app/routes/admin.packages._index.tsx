import { useEffect, useRef, useState } from "react";
import { Button, Input, useDisclosure, Textarea } from "@nextui-org/react";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import PackageController from "~/controllers/PackageController";
import AdminLayout from "~/layouts/Admin";
import { PackageInterface } from "~/types";
import CreateRecordModal from "~/components/modals/CreateRecord";
import PackageCard from "~/components/ui/package-card";

const AdminPackages = () => {
  const { packages } = useLoaderData<{
    packages: PackageInterface[];
  }>();

  const [filteredPackages, setFilteredPackages] =
    useState<PackageInterface[]>(packages);
  useEffect(() => {
    setFilteredPackages(packages);
  }, [packages]);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  console.log(packages);

  const [base64ImageString, setBase64ImageString] = useState<string>("");
  const imageUploadRef = useRef<HTMLInputElement>(null);

  const handleImageInputChange = (e: React.MouseEvent) => {
    e.preventDefault();
    const imageUpload = imageUploadRef.current;
    if (imageUpload) {
      imageUpload.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64ImageString(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Button
            variant="flat"
            color="primary"
            className="font-montserrat text-lg font-semibold"
            onClick={onOpen}
          >
            Add Package
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {filteredPackages.map(
            (packageItem: PackageInterface, index: number) => (
              <PackageCard
                key={index}
                title={packageItem.title}
                packageId={packageItem._id}
                bannerImage={packageItem.bannerImage}
              />
            )
          )}
        </div>
      </div>

      <CreateRecordModal
        title="Add Package"
        actionText="Save Package"
        size="lg"
        isOpen={isOpen}
        onCloseModal={onClose}
        onOpenChange={onOpenChange}
      >
        <div className="grid grid-cols-1 gap-3">
          <Input label="Title" name="title" labelPlacement="outside" />
          <Textarea
            labelPlacement="outside"
            label="Description"
            name="description"
          />

          <Button onClick={(e) => handleImageInputChange(e)}>
            Upload Image
          </Button>

          <input
            type="file"
            id="image-upload"
            ref={imageUploadRef}
            name="bannerImagePlaceholder"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
          <input
            value={base64ImageString}
            type="text"
            name="bannerImage"
            className="hidden"
          />
        </div>
      </CreateRecordModal>
    </AdminLayout>
  );
};

export default AdminPackages;

export const action: ActionFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const path = url.pathname + url.search;

  const formData = await request.formData();
  const intent = formData.get("intent") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const bannerImage = formData.get("bannerImage") as string;

  if (intent === "create") {
    const packageController = new PackageController(request);
    const response = await packageController.createPackage({
      title,
      description,
      bannerImage,
    });

    return response;
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const page = parseInt(searchParams.get("page") as string) || 1;
  const limit = parseInt(searchParams.get("limit") as string) || 10;
  const search_term = searchParams.get("search_term") || ("" as string);

  const packageController = new PackageController(request);
  const { packages } = await packageController.getAllPackages({
    page,
    limit,
    search_term,
  });

  return {
    packages,
  };
};
