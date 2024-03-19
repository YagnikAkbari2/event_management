import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/user-and-roles/user-management");
  }, [router]);

  return <div className="page-content" />;
};
Index.permission = {
  module: "master",
  sub_module: "user",
  alternateKey: "settingsMaster",
  roles: ["LIST"],
  redirectURL: "/",
};
export default Index;
