const removeSlugRegex = /(.+)\/[^/]*$/;
const getSlugRegex = /([^/]+)(?=\/?$)/;
const getRootRegex = /^([^/]+)/;

export function removeSlug(str: string) {
  const match = str.match(removeSlugRegex);
  return match ? match[1] : str;
}

export function getSlug(str: string) {
  const match = str.match(getSlugRegex);
  return match ? match[0] : '';
}

export function getRoot(str: string) {
  const match = str.match(getRootRegex);
  return match ? match[0] : str;
}