import _ from "lodash";

export const templateText = (user_id, text) => {
  return {
    recipient: {
      user_id: `${user_id}`,
    },
    message: {
      text: `${text}`,
    },
  };
};

export const templateImage = () => {
  return {
    recipient: {
      user_id: "111",
    },
    message: {
      text: "Title_of_image",
      attachment: {
        type: "template",
        payload: {
          template_type: "media",
          elements: [
            {
              media_type: "image",
              url: "https://developers.zalo.me/web/static/zalo.png",
            },
          ],
        },
      },
    },
  };
};

export const templateData = [];
