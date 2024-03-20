import { MotionDiv } from "../../components/motion-div";

const Template = async ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </MotionDiv>
  );
};

Template.displayName = "Template";

export default Template;
