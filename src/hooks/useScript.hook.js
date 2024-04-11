import { useEffect } from "react";
import createWidget from "../utils/create-widget-belvo.utils";

function useScript(src, id, setError, nextStep, setLoading) {
  useEffect(() => {
    // Create script
    setLoading(true);
    const node = document.createElement("script");
    node.src = src;
    node.type = "text/javascript";
    node.async = true;
    node.onload = () => createWidget(id, setError, nextStep);
    document.body.appendChild(node);
    setLoading(false);
  }, [src, id]);
}

export default useScript;
