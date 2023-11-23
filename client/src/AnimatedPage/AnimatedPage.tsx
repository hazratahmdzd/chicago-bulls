import { motion, Variants } from "framer-motion";
import { ReactNode, FC, useEffect } from "react";

interface AnimatedPageProps {
  children: ReactNode[] | ReactNode;
}

export const AnimatedPage: FC<AnimatedPageProps> = ({ children }) => {
  const animations: Variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }, []);

  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
