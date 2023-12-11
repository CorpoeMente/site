import { authOptions } from "@/app/utils/auth";
import { getServerSession } from "next-auth";

const handlePermissions = async () => {
  const data = await getServerSession(authOptions);

  return !data || !data.user || data.user.role !== "admin";
};

export default handlePermissions;
