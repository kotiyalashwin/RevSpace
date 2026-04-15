import * as motion from "motion/react-client";

type Space = { _count?: { testimonials: number } };
type Props = { spaces: Space[] };

const variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

function StatBox({ spaces }: Props) {
  const totalSpaces = spaces?.length || 0;
  const totalTestimonials = spaces?.reduce(
    (sum, s) => sum + (s._count?.testimonials || 0),
    0
  );
  const activeSpaces = spaces?.filter(
    (s) => (s._count?.testimonials || 0) > 0
  ).length;

  const stats = [
    { label: "Total Spaces", value: totalSpaces },
    { label: "Testimonials", value: totalTestimonials },
    { label: "Active Spaces", value: activeSpaces },
    { label: "Avg / Space", value: totalSpaces ? Math.round(totalTestimonials / totalSpaces) : 0 },
  ];

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-lg overflow-hidden border border-border bg-border"
    >
      {stats.map((s) => (
        <div key={s.label} className="bg-bg p-6 flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-fg-muted">
            {s.label}
          </span>
          <span className="text-3xl font-medium tracking-tight text-fg tabular-nums">
            {s.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default StatBox;
