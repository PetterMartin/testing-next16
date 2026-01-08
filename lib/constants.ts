export type EventItem = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: EventItem[] = [
  {
    title: "React Conf 2024",
    image: "/images/event1.png",
    slug: "react-conf-2024",
    location: "Las Vegas, NV",
    date: "December 10-11, 2024",
    time: "9:00 AM - 6:00 PM",
  },
  {
    title: "Next.js Conf 2024",
    image: "/images/event2.png",
    slug: "nextjs-conf-2024",
    location: "San Francisco, CA",
    date: "November 15-16, 2024",
    time: "10:00 AM - 5:00 PM",
  },
  {
    title: "JSConf EU 2024",
    image: "/images/event3.png",
    slug: "jsconf-eu-2024",
    location: "Berlin, Germany",
    date: "October 28-30, 2024",
    time: "9:00 AM - 7:00 PM",
  },
  {
    title: "AWS re:Invent 2024",
    image: "/images/event4.png",
    slug: "aws-reinvent-2024",
    location: "Las Vegas, NV",
    date: "December 2-6, 2024",
    time: "8:00 AM - 8:00 PM",
  },
  {
    title: "Google I/O Extended 2024",
    image: "/images/event5.png",
    slug: "google-io-extended-2024",
    location: "Mountain View, CA",
    date: "November 8, 2024",
    time: "10:00 AM - 4:00 PM",
  },
  {
    title: "DevOps World 2024",
    image: "/images/event6.png",
    slug: "devops-world-2024",
    location: "Orlando, FL",
    date: "October 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
  },
];
