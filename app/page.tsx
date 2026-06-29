"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [role, setRole] = useState("student");
  const router = useRouter();
  useEffect(() => {
    if (role === "student") {
      router.push("/dashboard");
    } else if (role === "admin") {
      router.push("/admin");
    } else if (role === "") {
      router.push("/auth");
    } else {
      throw new Error("نوع کاربر غیر طبیعی است");
    }
  }, []);

  return <></>;
}