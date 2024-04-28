// Admin Controller

import { Admin } from "~/models/Admin";
import { redirect } from "@remix-run/node";
import {
  createCookieSessionStorage,
  type SessionStorage,
} from "@remix-run/node";
import bcrypt from "bcrypt";
import { commitSession, getSession } from "~/session";

export default class AdminController {
  private request: Request;
  private storage: SessionStorage;

  /**
   * Initialize a AdminController instance
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

  // Create a new admin session
  private async createAdminSession(adminId: string, redirectTo: string) {
    const session = await this.storage.getSession();
    session.set("adminId", adminId);

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await this.storage.commitSession(session),
      },
    });
  }

  // Get the current admin session
  private async getAdminSession() {
    return this.storage.getSession(this.request.headers.get("Cookie"));
  }

  /**
   * Get the current logged in user's Id
   * @returns admin_id :string
   */
  public async getAdminId() {
    const session = await this.getAdminSession();
    const adminId = session.get("adminId");
    if (!adminId || typeof adminId !== "string") {
      return null;
    }
    return adminId;
  }

  public async getAdmin() {
    const adminId = await this.getAdminId();
    if (typeof adminId !== "string") {
      return null;
    }

    try {
      const admin = await Admin.findById(adminId).select("-password");
      return admin;
    } catch {
      throw this.logout();
    }
  }

  public async loginAdmin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const session = await getSession(this.request.headers.get("Cookie"));

    const admin = await Admin.findOne({ email });

    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);

    if (!admin) {
      session.flash("message", {
        title: "Invalid Credentials",
        status: "error",
      });
      return redirect(`/admin/login`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) {
      session.flash("message", {
        title: "Invalid Credentials",
        status: "error",
      });
      return redirect(`/admin/login`, {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    return this.createAdminSession(admin._id, "/");
  }

  public async logout() {
    const session = await this.getAdminSession();

    return redirect("/admin/login", {
      headers: {
        "Set-Cookie": await this.storage.destroySession(session),
      },
    });
  }

  public async requireAdminId(
    redirectTo: string = new URL(this.request.url).pathname
  ) {
    const session = await this.getAdminSession();

    const adminId = session.get("adminId");
    if (!adminId || typeof adminId !== "string") {
      const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
      throw redirect(`/admin/login?${searchParams}`);
    }

    return adminId;
  }
}
