import { LogOut } from "lucide-react";

function Sidebar() {
  return (
    <div
      className="h-screen w-32 md:w-60 fixed left-0 border-r-2 border-black  top-0  transition-all ease-in rounded-sm  "
      //   style={{
      //     backdropFilter: "blur(12px)",
      //   }}
    >
      <div className="p-4">
        <div className="text-black font-bold tracking-wider text-xl md:text-4xl mb-10">
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
                      ? "bg-black text-white"
                      : "text-black hover:text-white hover:bg-black"
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
