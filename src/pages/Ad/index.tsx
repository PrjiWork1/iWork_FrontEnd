import { useEffect } from "react";

export function Ad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-screen">
      <h1 className="bg-blue-400 font-inter">AD</h1>
    </div>
  );
}
