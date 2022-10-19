const copyToClipboard = (text) => {
  try {
    if (!text) {
      throw new Error();
    }
    window.navigator.clipboard.writeText(text);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export default copyToClipboard;
