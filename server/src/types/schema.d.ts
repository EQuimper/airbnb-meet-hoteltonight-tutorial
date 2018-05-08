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
    room: IRoom;
    getOwnerRoom: Array<IRoom>;
    me: IUser;
  }

  interface IRoomOnQueryArguments {
    id: string;
  }

  interface IRoom {
    __typename: 'Room';
    _id: string;
    name: string;
    description: string | null;
    bedroom: number;
    bathroom: number;
    location: IRoomLocation;
    price: number;
    haveInternet: boolean;
    haveAirCond: boolean;
    haveHeating: boolean;
    haveTv: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }

  interface IRoomLocation {
    __typename: 'RoomLocation';
    address: string;
    lat: number;
    lng: number;
  }

  interface IUser {
    __typename: 'User';
    _id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    loginWithEmailAndPassword: IAuth | null;
    signup: IAuth | null;
    makeRoomInactive: IRoom;
  }

  interface ILoginWithEmailAndPasswordOnMutationArguments {
    input: ILoginWithEmailAndPasswordInput;
  }

  interface ISignupOnMutationArguments {
    input: ISignupInput;
  }

  interface IMakeRoomInactiveOnMutationArguments {
    id: string;
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
}

// tslint:enable
