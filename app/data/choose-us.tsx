import { ReactNode } from "react";

interface ChooseUsInterface {
  title: string;
  description: string;
  icon?: ReactNode;
}

export const whyChooseUs: ChooseUsInterface[] = [
  {
    title: "Unbeatable Value",
    description:
      "We offer the most competitive data bundle prices on the market. We source directly from top providers, ensuring you get the best value.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 text-white"
      >
        <path d="M22.0049 5.99979H15.0049C11.6912 5.99979 9.00488 8.68608 9.00488 11.9998C9.00488 15.3135 11.6912 17.9998 15.0049 17.9998H22.0049V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979H21.0049C21.5572 2.99979 22.0049 3.4475 22.0049 3.99979V5.99979ZM15.0049 7.99979H23.0049V15.9998H15.0049C12.7957 15.9998 11.0049 14.2089 11.0049 11.9998C11.0049 9.79065 12.7957 7.99979 15.0049 7.99979ZM15.0049 10.9998V12.9998H18.0049V10.9998H15.0049Z"></path>
      </svg>
    ),
  },
  {
    title: "Simple & Flexible Plans",
    description:
      "We offer a variety of data bundle plans to fit your specific needs. Whether you're a casual user or a data-hungry streamer, we have the perfect plan for you.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 text-white"
      >
        <path d="M20.5021 5.92225 12 1 3.49793 5.92225 12 10.8445 20.5021 5.92225ZM2.5 7.6555V17.5L11 22.4211V12.5765L2.5 7.6555ZM13 22.4211 21.5 17.5V7.6555L13 12.5765V22.4211Z"></path>
      </svg>
    ),
  },
  {
    title: "24/7 Customer Support",
    description:
      "We don't just sell data, we provide exceptional customer service. Our friendly support team is available 24/7 to answer your questions.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6 text-white"
      >
        <path d="M21 8C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8H21ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path>
      </svg>
    ),
  },
];
