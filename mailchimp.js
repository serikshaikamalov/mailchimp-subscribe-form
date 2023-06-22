/**
 * Used to subscribe to the Mailchimp newsletter
 * @param {*} event - an event of onsubmit handler
 * @param {*} _url - mailchimp provided url. You can get it from admin dashboard
 */
export const subscribe = async (event, _url) => {
  try {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    console.log("formProps: ", formProps);

    if (!formProps?.email)
      throw new Error("Please provide email for subscription");

    const { email } = formProps;
    const url =
      _url ||
      `https://itsnuqtah.us20.list-manage.com/subscribe/post-json?u=1d845a4ca14e641f9ea2e18ef&id=03e21cfcd1&f_id=009856e6f0&EMAIL=${email}&c=?`;
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const responseInJson = await response.json();
      console.log("Mailchimp > subscribe: ", responseInJson);
      return responseInJson;
    } else {
      throw new Error(response.text);
    }
  } catch (ex) {
    console.error(`Mailchimp > execption on subscribing: `, ex);
    throw ex;
  }
};
