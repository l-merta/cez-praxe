import { useState, useEffect } from "react"; 

export function useSetLastTab(tab: string) {
  localStorage.setItem("lastTab", tab);
}
export function useGetLastTab(): { lastTab: string, isLoading: boolean } {
  const [lastTab, setLastTab] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("lastTab");
    if (stored) {
      setLastTab(stored);
    }
    setIsLoading(false);
  }, []);

  return { lastTab, isLoading };
}
