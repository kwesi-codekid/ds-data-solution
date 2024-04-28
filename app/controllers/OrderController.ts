// Order Controller

import { Package } from "~/models/Package";
import { Bundle } from "~/models/Bundle";
import {
  json,
  redirect,
  createCookieSessionStorage,
  type SessionStorage,
} from "@remix-run/node";
import { Order } from "~/models/Order";

export default class OrderController {
  private request: Request;
  private storage: SessionStorage;

  /**
   * Initialize a PaymentController instance
   * @param request This Fetch API interface represents a resource request.
   * @returns this
   */

  constructor(request: Request) {
    this.request = request;

    const secret = process.env.SESSION_SECRET as string;
    if (!secret) {
      throw new Error("No session secret provided");
    }
    this.storage = createCookieSessionStorage({
      cookie: {
        name: "_session",
        secrets: [secret],
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
      },
    });
  }

  //   Get all orders
  public async getAllOrders({
    limit = 10,
    page = 1,
    search_term = "",
  }: {
    limit?: number;
    page?: number;
    search_term?: string;
  }) {
    const orders = await Order.find({
      fullName: { $regex: search_term, $options: "i" },
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("bundle")
      .populate("package")
      .sort({ createdAt: -1 })
      .exec();

    return { orders };
  }

  //   Get order by ID
  public async getOrderById(id: string) {
    const order = await Order.findById(id).populate("bundles").exec();

    return { order };
  }

  //   Create order
  public async createOrder({
    fullName,
    email,
    amount,
    beneficiaryNumber,
    bundle,
    package: packageId,
  }: {
    fullName: string;
    email: string;
    amount: number;
    beneficiaryNumber: string;
    bundle: string;
    package: string;
  }) {
    const order = new Order({
      fullName,
      email,
      amount,
      beneficiaryNumber,
      bundle,
      package: packageId,
    });

    await order.save();

    return { order };
  }
}
