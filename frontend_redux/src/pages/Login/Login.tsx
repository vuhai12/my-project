import InputFields from "../../components/InputFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginType } from "../../types/auth.type";
import { DispatchApp } from "../../redux/store";
import { useDispatch } from "react-redux";
import { postLogin } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at least 3 characters long" }),
  password: z
    .string()
    .min(3, { message: "password must be at least 3 characters long" }),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(FormSchema),
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch = useDispatch<DispatchApp>();
  const navigate = useNavigate(); // Khai báo hook navigate

  const onSubmit = async (data: LoginType) => {
    try {
      // Gọi action login từ Redux
      const res = await dispatch(postLogin(data));

      // Chuyển hướng sau khi login thành công
      if (res) {
        navigate("/home"); // Chuyển hướng tới trang home sau khi login thành công
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <InputFields
                    variant={"outlined"}
                    name="username"
                    label="username"
                    type="text"
                    control={control}
                    errorMessage={errors.username?.message}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <InputFields
                    variant={"outlined"}
                    name="password"
                    label="password"
                    type="text"
                    control={control}
                    errorMessage={errors.password?.message}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
