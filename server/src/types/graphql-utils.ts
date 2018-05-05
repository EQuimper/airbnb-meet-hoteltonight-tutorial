export interface ResolverMap {
  [key: string]: {
    [key: string]: (parent: any, args: any, context: any, info: any) => any;
  };
}
