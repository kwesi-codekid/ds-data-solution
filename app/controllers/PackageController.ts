// Package Controller

import { Package } from "~/models/Package";
import { Bundle } from "~/models/Bundle";
import {
  json,
  redirect,
  createCookieSessionStorage,
  type SessionStorage,
} from "@remix-run/node";

export default class PackageController {
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

  //   Get all packages
  public async getAllPackages({
    limit = 10,
    page = 1,
    search_term = "",
  }: {
    limit?: number;
    page?: number;
    search_term?: string;
  }) {
    const packages = await Package.find({
      title: { $regex: search_term, $options: "i" },
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("bundles")
      .sort({ createdAt: -1 })
      .exec();

    return { packages };
  }

  // Get package by ID
  public async getPackageById({ packageId }: { packageId: string }) {
    try {
      const pkg = await Package.findById(packageId);

      return pkg;
    } catch (error) {
      console.log("Error fetching package detail", error);
    }
  }

  // Create package
  public async createPackage({
    title,
    description,
    bannerImage,
  }: {
    title: string;
    description: string;
    bannerImage: string;
  }) {
    try {
      const pkg = new Package({
        title,
        description,
        bannerImage,
      });

      await pkg.save();
      return { message: "Package created successfully" };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  // Create bundle
  public async createBundle({
    volume,
    packageId,
    price,
  }: {
    volume: number;
    price: number;
    packageId: string;
  }) {
    try {
      const bundle = new Bundle({
        volume: volume,
        price: price,
        package: packageId,
      });

      await bundle.save();
      return { message: "Bundle created successfully" };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  // Get bundles for a package
  public async getPackageBundles({ packageId }: { packageId: string }) {
    try {
      const bundles = await Bundle.find({ package: packageId });

      return bundles;
    } catch (error) {
      console.log("Error fetching package detail", error);
    }
  }
}
