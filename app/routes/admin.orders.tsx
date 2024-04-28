import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@nextui-org/react";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import OrderController from "~/controllers/OrderController";
import AdminLayout from "~/layouts/Admin";
import { OrderInterface } from "~/types";

const AdminOrders = () => {
  const { orders } = useLoaderData<{ orders: OrderInterface[] }>();
  console.log(orders);

  return (
    <AdminLayout>
      <Table aria-label="Order table" className="lg:!h-[84vh]">
        <TableHeader>
          <TableColumn className="font-montserrat">Package</TableColumn>
          <TableColumn className="font-montserrat">Date</TableColumn>
          <TableColumn className="font-montserrat">Customer</TableColumn>
          <TableColumn className="font-montserrat">Beneficiary</TableColumn>
          <TableColumn className="font-montserrat">Bundle</TableColumn>
          <TableColumn className="font-montserrat">Amount</TableColumn>
          <TableColumn className="font-montserrat">Status</TableColumn>
          <TableColumn className="font-montserrat">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="flex items-center gap-2">
                <img
                  src={order.package.bannerImage}
                  className="size-9 rounded-lg"
                  alt={order.package.title}
                />
                <p className="font-nunito font-medium">{order.package.title}</p>
              </TableCell>
              <TableCell className="font-nunito font-medium text-slate-600">
                {new Date(order.createdAt).toDateString()}
              </TableCell>
              <TableCell className="font-nunito font-medium text-slate-600">
                {order.fullName}
              </TableCell>
              <TableCell className="font-nunito font-medium text-slate-600">
                {order.beneficiaryNumber}
              </TableCell>
              <TableCell className="font-nunito font-medium text-slate-600">
                {order.bundle.volume} GB
              </TableCell>

              <TableCell className="font-nunito font-medium text-slate-600">
                GH {order.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Chip
                  className="font-nunito font-bold"
                  variant="flat"
                  size="sm"
                  color={`${order.status === "pending" ? "danger" : "success"}`}
                >
                  {order.status}
                </Chip>
              </TableCell>
              <TableCell>
                <Button
                  isDisabled={order.status === "processed"}
                  variant="flat"
                  color="success"
                  size="sm"
                  radius="md"
                  className="font-montserrat font-semibold"
                >
                  Processed
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default AdminOrders;
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const orderController = new OrderController(request);
  const { orders } = await orderController.getAllOrders({
    limit: 10,
    page: parseInt(url.searchParams.get("page") as string) || 1,
    search_term: url.searchParams.get("search_term") || "",
  });

  return {
    orders,
  };
};
