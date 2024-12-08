function StatBox() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Statistics Card */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: "rgba(95, 72, 162, 0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(1, 168, 164, 0.1)",
        }}
      >
        <h2 className="text-lg md:text-3xl font-semibold text-white mb-4">
          Statistics
        </h2>
        <div className="space-y-4 md:text-md">
          <div className="flex justify-between text-white/80">
            <span>Total Spaces</span>
            <span>0</span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Total Testimonials</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatBox;
