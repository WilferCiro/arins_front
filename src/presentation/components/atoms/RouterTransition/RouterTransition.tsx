"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

function RouterTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    nprogress.complete();
  }, [currentUrl]);

  useEffect(() => {
    const url = pathname + (searchParams || "").toString();
    setCurrentUrl(url);
  }, [pathname, searchParams]);

  return <NavigationProgress />;
}

export default RouterTransition;
