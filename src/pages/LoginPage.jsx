import logo from "../assets/logo-video-belajar.png";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import Divider from "../components/ui/Divider";
import AuthHeader from "../components/auth/AuthHeader";
import GoogleButton from "../components/auth/GoogleButton";
import Navbar from "../components/layout/Navbar";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi")
    .min(6, "Minimal 6 karakter"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Login data:", data);

    navigate("/");
  };

  return (
    <div className="h-[994px]">
      <div className="h-full bg-bg-base">
        <Navbar />

        <div className="xl:h-full flex p-9 items-center justify-center">
          <Card>
            <AuthHeader
              title="Masuk ke Akun"
              subtitle="Yuk, lanjutin belajarmu di videobelajar."
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <InputField
                label="E-Mail"
                required
                type="email"
                placeholder="nama@email.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <InputField
                label="Kata Sandi"
                required
                type="password"
                placeholder="Masukkan kata sandi"
                error={errors.password?.message}
                {...register("password")}
              />

              <div className="text-right -mt-2">
                <a
                  href="/forgot-password"
                  className="text-body-sm md:text-body-md font-normal text-text-dark-disabled hover:underline"
                >
                  Lupa Password?
                </a>
              </div>

              <Button type="submit" variant="solid" disabled={isSubmitting}>
                {isSubmitting ? "Memproses..." : "Masuk"}
              </Button>

              <Button
                type="button"
                color="primary"
                variant="soft"
                onClick={() => navigate("/register")}
              >
                Daftar
              </Button>
            </form>

            <Divider text="atau" />

            <GoogleButton onClick={() => console.log("Google SSO")} />
          </Card>
        </div>
      </div>
    </div>
  );
}
