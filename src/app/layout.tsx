import { createFlagsmithInstance } from "flagsmith/isomorphic";
import { Providers } from "./providers";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import { JWTVerify } from "@/lib/cookies";

export const metadata = {
  title: "Booking AI",
  description: "An AI powered booking system for your business",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await dbConnect();

  const cookieStore = cookies();

  // get token
  const token = cookieStore.get("token")?.value;

  let identity = "";
  let currUser = null;

  if (token) {
    let tokenUser: any = await JWTVerify(
      token as string,
      process.env.JWT_SECRET as string
    );

    // get user
    currUser = await UserModel.findOne({
      email: tokenUser.email,
    }).lean();

    if (currUser) {
      identity = currUser?.username;
    }
  }

  // const response = await fetch("/api/user/retrieveAuth", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + token,
  //   },
  // });

  // console.log(response);

  const flagsmithSSR = createFlagsmithInstance();
  await flagsmithSSR.init({
    // fetches flags on the server
    environmentID: process.env.NEXT_PUBLIC_FEATURE_FLAG_CLIENT_KEY as string,
    realtime: true,
    identity: identity,
    traits: !currUser
      ? undefined
      : {
          Email: currUser?.email,
          Username: currUser?.username,
          "Full Name": `${currUser?.firstName} ${currUser?.lastName}`,
        },
  });

  const state = flagsmithSSR.getState();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers flagSmith={state}>{children}</Providers>
      </body>
    </html>
  );
}
