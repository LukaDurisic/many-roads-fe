export const getEndpointPathWith =
  (baseServicePath: string) => (route: string) =>
    `${baseServicePath}${route}`;
