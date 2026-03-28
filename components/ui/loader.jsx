import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Loader = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <motion.div
        className="h-16 w-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export { Loader };
