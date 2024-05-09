// User Controller

import { User } from "~/models/User";
import { redirect } from "@remix-run/node";
import {
  createCookieSessionStorage,
  type SessionStorage,
} from "@remix-run/node";
import bcrypt from "bcrypt";
import { commitSession, getSession } from "~/session";

export default class UserController {
  private request: Request;
  private storage: SessionStorage;

  /**
   * Initialize a UserController instance
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

  // Create a new user session
  private async createUserSession(userId: string, redirectTo: string) {
    const session = await this.storage.getSession();
    session.set("userId", userId);

    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await this.storage.commitSession(session),
      },
    });
  }

  // Get the current user session
  private async getUserSession() {
    return this.storage.getSession(this.request.headers.get("Cookie"));
  }

  /**
   * Get the current logged in user's Id
   * @returns user_id :string
   */
  async getUserId() {
    const session = await this.getUserSession();
    return session.get("userId");
  }

  /**
   * Get the current logged in user's details
   * @returns user :UserInterface
   */
  async getUser() {
    const userId = await this.getUserId();
    if (typeof userId !== "string") {
      return null;
    }

    try {
      return await User.findById(userId).select("-password");
    } catch {
      throw this.logout();
    }
  }

  /**
   * Log in a user
   * @param email :string
   * @param password :string
   * @returns Promise<Response>
   */
  async login(email: string, password: string) {
    const session = await getSession(this.request.headers.get("Cookie"));
    const user = await User.findOne({ email });

    if (!user) {
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return redirect("/login", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
    }

    return this.createUserSession(user._id, "/");
  }

  /**
   * Log out a user
   * @returns Promise<Response>
   */
  async logout() {
    const session = await this.getUserSession();

    return redirect("/", {
      headers: {
        "Set-Cookie": await this.storage.destroySession(session),
      },
    });
  }

  /**
   * Register a new user
   * @param email :string
   * @param fullName :string
   * @param phoneNumber :string
   * @param password :string
   * @returns Promise<Response>
   */
  async register(
    email: string,
    fullName: string,
    phoneNumber: string,
    password: string
  ) {
    const user = await User.create({
      email,
      fullName,
      phoneNumber,
      password: await bcrypt.hash(password, 10),
      userType: "user",
    });

    return this.createUserSession(user._id, "/");
  }

  public async requireUserId(
    redirectTo: string = new URL(this.request.url).pathname
  ) {
    const session = await this.getUserSession();

    const userId = session.get("userId");
    if (!userId) {
      const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
      throw redirect(`/login?${searchParams.toString()}`);
    }

    return userId;
  }
}
