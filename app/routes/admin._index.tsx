import { LoaderFunction } from "@remix-run/node";
import AdminController from "~/controllers/AdminController.server";
import AdminLayout from "~/layouts/Admin";

const AdminIndex = () => {
  return (
    <AdminLayout>
      <h1>Admin</h1>
    </AdminLayout>
  );
};

export default AdminIndex;

export const loader: LoaderFunction = async ({ request }) => {
  const adminController = new AdminController(request);
  await adminController.requireAdminId();
  const admin = await adminController.getAdmin();

  return {
    admin,
  };
};
