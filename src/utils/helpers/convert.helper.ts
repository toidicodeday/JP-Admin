export const checkPath = (path: string) => {
  let newPath = "";
  if (path.includes("//")) {
    newPath = checkPath(path.replaceAll("//", "/"));
  } else {
    newPath = path;
  }
  console.log('newPath', newPath)

  return newPath;
};
