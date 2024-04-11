import { PostReq } from "./network.utils";

async function createWidget(id, setError, nextStep) {
  // Function to call your server-side to generate the access_token and retrieve the your access token
  function getAccessToken() {
    return fetch(`${process.env.REACT_APP_API_URL}/v1/auth/belvo/token`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error("Error:", error));
  }

  const successCallbackFunction = async (link, institution) => {
    const data = {
      link: {
        link,
        institution,
      },
      id,
    };
    const request = await PostReq("/v1/lease/request/add-link", data);
    if (request.data?.error) {
      setError(request.data?.message?.message);
      setTimeout(() => {
        setError("");
      }, "15000");
    } else {
      nextStep();
    }
  };
  const onExitCallbackFunction = (data) => {
    // Do something with the exit data.
    console.log("llega a onExitCallbackFunction= ", data);
  };
  const onEventCallbackFunction = (data) => {
    // Do something with the exit data.
  };
  const config = {
    //country_codes: ["CO"],
    callback: (link, institution) => successCallbackFunction(link, institution),
    onExit: (data) => onExitCallbackFunction(),
    onEvent: (data) => onEventCallbackFunction(),
  };
  const response = await getAccessToken();
  console.log("response ", response);
  window.belvoSDK.createWidget(response?.access, config).build();
}

export default createWidget;
