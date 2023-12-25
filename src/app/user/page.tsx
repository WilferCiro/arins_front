// Nextjs and react
import { getServerSession } from "next-auth";

// Mantine

// Web3

// Custom
import { UserAuthSchema } from "@/domain/schemas/UserAuthSchema";
import UserViewPage from "@/presentation/components/pages/User/UserViewPage";
import { authOptions } from "@/data/config/authConfig";

export const metadata = {
  title: "Arins :: Visualización de certificados",
};

const StudentViewPage = async () => {
  return (
    <>
      <UserViewPage />
    </>
  );
};

export default StudentViewPage;
