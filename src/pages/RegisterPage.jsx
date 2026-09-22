import logo from "../assets/logo-video-belajar.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import PhoneInput from "../components/ui/PhoneInput";
import SelectField from "../components/ui/SelectField";
import AuthHeader from "../components/auth/AuthHeader";
import Divider from "../components/ui/Divider";
import GoogleButton from "../components/auth/GoogleButton";
import Navbar from "../components/layout/Navbar";
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    namaLengkap: z.string().min(1, "Nama wajib diisi"),
    email: z
      .string()
      .min(1, "E-mail wajib diisi")
      .email("Format email tidak valid"),
    jenisKelamin: z.string().min(1, "Pilih Jenis Kelamin"),
    noHp: z
      .string()
      .min(9, "Nomor HP minimal 9 digit")
      .regex(/^\d+$/, "Nomor HP harus berupa angka"),
    password: z.string().min(6, "Mimimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi Password Wajib Di Isi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata Sandi Tidak Cocok",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    console.log("Register data", data);
  };

  return (
    <div className="h-[994px]">
      <div className="h-full bg-bg-base">
        <Navbar />

        <div className="xl:h-full flex p-9 items-center justify-center bg-secondary-50">
          <Card className="">
            <AuthHeader
              title="Pendaftaran Akun"
              subtitle="Yuk, daftarkan akunmu sekarang juga."
            />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" flex flex-col gap-4"
            >
              <InputField
                label="Nama Lengkap"
                required
                placeholder="Masukan Nama Lengkap"
                error={errors.namaLengkap?.message}
                {...register("namaLengkap")}
              />

              <InputField
                label="E-mail"
                required
                type="email"
                placeholder="nama@gmail.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <SelectField
                label="Jenis Kelamin"
                required
                placeholder="Pilih Jenis Kelamin"
                error={errors.jenisKelamin?.message}
                options={[
                  { value: "wanita", label: "Wanita" },
                  { value: "pria", label: "Pria" },
                ]}
                {...register("jenisKelamin")}
              />

              <PhoneInput
                label="No. Hp"
                required
                error={errors.noHp?.message}
                {...register("noHp")}
              />

              <InputField
                label="Kata Sandi"
                required
                type="password"
                placeholder="Masukan kata sandi"
                error={errors.password?.message}
                {...register("password")}
              />

              <InputField
                label="Konfirmasi Kata Sandi"
                required
                type="password"
                placeholder="Konfirmasi Kata Sandi"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />

              <div className="text-right -mt-2">
                <a
                  href="/forgot-password"
                  className="text-body-sm text-text-dark-primary hover:underline"
                >
                  Lupa Password?
                </a>
              </div>

              <Button
                type="submit"
                color="primary"
                variant="solid"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Daftar"}
              </Button>

              <Button
                type="button"
                color="primary"
                variant="soft"
                onClick={() => navigate("/login")}
              >
                Login
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
