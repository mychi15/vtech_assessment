import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useFocus = () => {
  const navigate = useNavigate();
  const onFocus = () => {
    navigate(0);
  };
  useEffect(() => {
    window.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("visibilitychange", onFocus);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
};

export { useFocus };
