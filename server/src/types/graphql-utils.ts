export interface ResolverMap {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: any,
      context: {
        user: null | {
          _id: string;
        };
      },
      info: any,
    ) => any;
  };
}
