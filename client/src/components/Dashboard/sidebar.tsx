import { LogOut } from "lucide-react";

function Sidebar() {
  return (
    <div
      className="h-screen w-32 md:w-60 fixed left-0  top-0 bg-[url('/bg.webp')] bg-center s transition-all ease-in roudned rounded-sm  "
      //   style={{
      //     backdropFilter: "blur(12px)",
      //   }}
    >
      <div className="p-4">
        <div className="text-white font-bold tracking-wider text-xl md:text-4xl mb-10">
          RevSpace
        </div>
        <nav className="space-y-4">
          {["Dashboard", "Spaces", "Integrations", "Account", "LogOut"].map(
            (item, i) => (
              <a
                key={item}
                href="#"
                className={`flex text-xs lg:text-lg items-center space-x-3 p-3 rounded-lg transition-all
                  ${
                    i === 0
                      ? "bg-[rgba(1,168,164,0.2)] text-white"
                      : "text-white/85 hover:bg-[rgba(1,168,164,0.1)] hover:text-white"
                  }`}
              >
                {item}
                {item === "LogOut" ? (
                  <div className="ml-2">
                    <LogOut />
                  </div>
                ) : (
                  ""
                )}
              </a>
            )
          )}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
