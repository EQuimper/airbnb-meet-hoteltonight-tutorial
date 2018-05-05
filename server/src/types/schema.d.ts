// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    hello: string;
    bye: string | null;
  }

  interface IMutation {
    __typename: 'Mutation';
    loginWithEmailAndPassword: IAuth | null;
    signup: IAuth | null;
  }

  interface ILoginWithEmailAndPasswordOnMutationArguments {
    input: ILoginWithEmailAndPasswordInput;
  }

  interface ISignupOnMutationArguments {
    input: ISignupInput;
  }

  interface ILoginWithEmailAndPasswordInput {
    email: string;
    password: string;
  }

  interface IAuth {
    __typename: 'Auth';
    token: string;
  }

  interface ISignupInput {
    email: string;
    password: string;
  }

  interface IUser {
    __typename: 'User';
    _id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
}

// tslint:enable
