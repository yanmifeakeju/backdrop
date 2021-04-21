const got = require('got');

exports.validateAndSanitzeUrl = async (str) => {
  const regEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

  if (!regEx.test(str)) {
    return {
      error: true,
      message: 'You have not provided a valid url with https or http',
    };
  }

  try {
    const response = await got(str);
    let url = str;
    let responseUrl = response.request.gotOptions.hostname.split('.');
    console.log();

    if (responseUrl[0] === 'www') {
      responseUrl.shift();
      url = `${response.request.gotOptions.protocol}//${responseUrl.join(
        '.'
      )}/${response.request.gotOptions.path}`;
    }

    return { error: false, message: url };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

exports.generateSixUniqueChars = () => {
  return (
    Math.random().toString(36).substring(2, 5) +
    Math.random().toString(36).substring(2, 5)
  );
};
