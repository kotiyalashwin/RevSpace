function StatBox() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <span>0</span>
          </div>
          <div className="flex justify-between text-black/80">
            <span>Total Testimonials</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatBox;
