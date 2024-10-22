export const checkImageURL = (url) => {
    if (!url) return false;
    const pattern = new RegExp('^https?:\\/\\/.+', 'i'); // Removed file extension check
    return pattern.test(url);
  };
  