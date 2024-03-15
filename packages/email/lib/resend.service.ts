import { nanoid } from "nanoid";
import { resend } from "./resend.provider";

type SendProps = Required<Parameters<typeof resend.emails.send>[0]>;

export const sendMail = async (props: SendProps) => {
  return resend.emails.send({
    ...props,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
  });
};
