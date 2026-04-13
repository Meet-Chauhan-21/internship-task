const path = require("path");

const normalizeFolderPath = (folderPath = "") => {
  const cleanedPath = String(folderPath).replace(/\\/g, "/").trim();

  if (!cleanedPath) {
    return "";
  }

  const normalizedPath = cleanedPath.replace(/^\/+|\/+$/g, "");
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.some((segment) => segment === "..")) {
    throw new Error("Invalid folder path");
  }

  return segments.join("/");
};

const resolveFolderFsPath = (baseDir, folderPath = "") => {
  const normalizedPath = normalizeFolderPath(folderPath);
  return normalizedPath ? path.join(baseDir, normalizedPath) : baseDir;
};

const getParentFolderPath = (folderPath = "") => {
  const normalizedPath = normalizeFolderPath(folderPath);

  if (!normalizedPath) {
    return "";
  }

  const lastSlashIndex = normalizedPath.lastIndexOf("/");
  return lastSlashIndex === -1 ? "" : normalizedPath.slice(0, lastSlashIndex);
};

const isDirectChildPath = (parentPath = "", childPath = "") => {
  const normalizedParentPath = normalizeFolderPath(parentPath);
  const normalizedChildPath = normalizeFolderPath(childPath);

  if (!normalizedChildPath) {
    return false;
  }

  return getParentFolderPath(normalizedChildPath) === normalizedParentPath;
};

module.exports = {
  normalizeFolderPath,
  resolveFolderFsPath,
  getParentFolderPath,
  isDirectChildPath,
};