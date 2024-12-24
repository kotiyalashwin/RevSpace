import * as motion from "motion/react-client";

type props = {
  spaces: [];
};

const variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 100,
  },
};

function StatBox({ spaces }: props) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: "easeIn" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Statistics Card */}
      <div
        className="rounded-xl p-6 border-2"
        style={{
          backgroundColor: "white",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 className="text-lg md:text-3xl font-semibold text-black mb-4">
          Statistics
        </h2>
        <div className="space-y-4 md:text-md">
          <div className="flex justify-between text-black/80">
            <span>Total Spaces</span>
            <span>{spaces.length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default StatBox;
