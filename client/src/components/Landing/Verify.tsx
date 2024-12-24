import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type page = {
  verify: "signup" | "login";
};

type signupProps = {
  name?: string;
  email?: string;
  password?: string;
};

function Verify({ verify }: page) {
  const [formData, setFormData] = useState<signupProps>();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      verify === "login"
        ? !formData?.email || !formData.password
        : !formData?.email || !formData.name || !formData.password
    ) {
      toast.error("All Fields Required");
      return;
    }

    const url = "http://localhost:3000/api/v1/user/";
    const respone = await axios.post(`${url}${verify}`, formData, {
      withCredentials: true,
    });
    const data = await respone.data;
    // @ts-ignore
    if (data.success) {
      // @ts-ignore
      toast.success(data.message);
      navigate("/dashboard");
    } else {
      // @ts-ignore
      toast.error(data.error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center font-default">
      <div className="max-w-7xl flex shadow-xl ">
        <div className=" flex flex-col w-[60%] rounded-l-xl justify-center items-center p-8 space-y-5  bg-white border-2">
          <h1 className="font-semibold text-4xl">
            {verify === "login" ? "Login to RevSpace" : "Welcome to RevSpace"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full ">
            {verify === "login" ? (
              ""
            ) : (
              <>
                <label>Name:</label>
                <input
                  className="input-base"
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Name"
                />
              </>
            )}

            <label>Email:</label>
            <input
              className="input-base"
              type="text"
              placeholder="Enter Email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <label>Password:</label>
            <input
              type="text"
              className="input-base"
              placeholder="Enter Password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />

            <button type="submit" className="btn-base">
              Submit
            </button>
          </form>

          <p className="text-neutral-400 font-normal">
            {verify === "login" ? `New to RevSpace? ` : `Already a user?`}
            {verify === "login" ? (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  className="underline "
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="underline"
                >
                  {" "}
                  LogIn
                </button>
              </>
            )}
          </p>
        </div>
        <div className="bg-[#171F25] rounded-r-xl gap-8  text-center flex justify-center flex-col  text-white">
          <h1 className="text-5xl p-4 ">
            {verify === "login" ? "Welcome back!!" : "Welcome To RevSpace"}
          </h1>
          {verify === "signup" ? (
            <p className="text-md ">
              Enter your details and start your journey with us.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Verify;
