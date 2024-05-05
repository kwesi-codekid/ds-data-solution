import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PackageController from "~/controllers/PackageController";
import { BundleInterface, PackageInterface } from "~/types";
import AdminLayout from "~/layouts/Admin";
import {
  Button,
  useDisclosure,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import CreateRecordModal from "~/components/modals/CreateRecord";
import { useEffect, useState } from "react";
import React from "react";
import { DeleteIcon } from "~/components/icons/Delete";
import { EditIcon } from "~/components/icons/Edit";

const PackageDetail = () => {
  const { pkg, packageId, bundles } = useLoaderData<{
    pkg: PackageInterface;
    bundles: BundleInterface[];
    packageId: string;
  }>();
  const [filteredBundles, setFilteredBundles] =
    useState<BundleInterface[]>(bundles);
  useEffect(() => {
    setFilteredBundles(bundles);
  }, [bundles]);

  console.log(filteredBundles);

  const createBundleDisclosure = useDisclosure();

  const bundleTableCols = [
    {
      name: "Volume (GB)",
      id: "volume",
    },
    {
      name: "Price (GHS)",
      id: "price",
    },
    {
      name: "Agent Price (GHS)",
      id: "agentPrice",
    },
    {
      name: "Actions",
      id: "actions",
    },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full bg-indigo-500/5 rounded-3xl p-5">
        {/* overview */}
        <div className="rounded-2xl bg-white p-3 flex flex-col gap-4 lg:col-span-2">
          <h2 className="font-montserrat font-bold text-4xl text-slate-800">
            {pkg.title}
          </h2>
          <div className="rounded-2xl overflow-hidden border-[8px] border-slate-500/20">
            <img
              src={pkg.bannerImage}
              alt="banner"
              className="w-full h-72 object-cover hover:scale-105 transition-all duration-400 ease-in-out"
            />
          </div>
          <p className="font-nunito text-slate-500">{pkg.description}</p>
        </div>

        {/* bundles table */}
        <div className="md:col-span-2 lg:col-span-3 rounded-2xl bg-white flex flex-col gap-4 p-4 h-full">
          <div className="flex items-center justify-between">
            <Button
              variant="flat"
              color="primary"
              className="font-montserrat font-medium"
              onPress={() => createBundleDisclosure.onOpen()}
            >
              Add Bundle
            </Button>
          </div>
          <Table
            aria-label="Bundles table"
            className="lg:h-[70vh] overflow-y-auto"
          >
            <TableHeader columns={bundleTableCols}>
              {bundleTableCols.map((column, index) => (
                <TableColumn key={index}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {bundles.map((bundle: BundleInterface, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    <p className="font-nunito text-lg text-slate-700">
                      {bundle.volume}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-nunito text-lg text-slate-700">
                      {bundle.price}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-nunito text-lg text-slate-700">
                      {bundle.agentPrice}
                    </p>
                  </TableCell>
                  <TableCell className="flex items-center gap-2 font-nunito font-medium">
                    <Button
                      variant="light"
                      radius="lg"
                      color="primary"
                      startContent={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="light"
                      radius="lg"
                      color="danger"
                      startContent={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CreateRecordModal
        isOpen={createBundleDisclosure.isOpen}
        onOpenChange={createBundleDisclosure.onOpenChange}
        onCloseModal={createBundleDisclosure.onClose}
        title="Add Bundle"
        actionText="Save"
      >
        <div className="grid grid-cols-1 gap-3">
          <Input
            type="text"
            name="packageId"
            label="Package ID"
            labelPlacement="outside"
            className="hidden"
            value={packageId}
          />
          <Input
            type="number"
            name="volume"
            label="Bundle Volume"
            labelPlacement="outside"
          />
          <Input
            type="number"
            name="price"
            label="Price"
            labelPlacement="outside"
          />
          <Input
            type="number"
            name="agentPrice"
            label="Agent Price"
            labelPlacement="outside"
          />
        </div>
      </CreateRecordModal>
    </AdminLayout>
  );
};

export default PackageDetail;

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url);

  const formData = await request.formData();
  const intent = formData.get("intent");
  const volume = parseInt(formData.get("volume") as string);
  const price = parseInt(formData.get("price") as string);
  const agentPrice = parseInt(formData.get("agentPrice") as string);
  const packageId = formData.get("packageId") as string;

  const packageController = new PackageController(request);

  if (intent === "create") {
    const response = await packageController.createBundle({
      volume,
      price,
      agentPrice,
      packageId,
    });
    return response;
  }
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const { packageId } = params;

  const packageController = new PackageController(request);
  const pkg = await packageController.getPackageById({
    packageId: packageId || "",
  });
  const bundles = await packageController.getPackageBundles({
    packageId: packageId || "",
  });
  return { pkg, bundles, packageId };
};
