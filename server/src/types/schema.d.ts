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
    place: IPlace;
    getOwnerPlaces: Array<IPlace>;
    me: IUser;
  }

  interface IPlaceOnQueryArguments {
    id: string;
  }

  interface IPlace {
    __typename: 'Place';
    _id: string;
    name: string;
    description: string | null;
    bedroom: number;
    bathroom: number;
    location: IPlaceLocation;
    price: number;
    haveInternet: boolean;
    haveAirCond: boolean;
    haveHeating: boolean;
    haveTv: boolean;
    isActive: boolean;
    maxGuest: number;
    petsAllowed: boolean;
    photos: Array<string>;
    owner: IUser;
    createdAt: string;
    updatedAt: string;
  }

  interface IPlaceLocation {
    __typename: 'PlaceLocation';
    address: string;
    lat: number;
    lng: number;
  }

  interface IUser {
    __typename: 'User';
    _id: string;
    email: string;
    places: Array<IPlace>;
    createdAt: string;
    updatedAt: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    loginWithEmailAndPassword: IAuth | null;
    signup: IAuth | null;
    makePlaceInactive: IPlace;
    createPlace: IPlace;
  }

  interface ILoginWithEmailAndPasswordOnMutationArguments {
    input: ILoginWithEmailAndPasswordInput;
  }

  interface ISignupOnMutationArguments {
    input: ISignupInput;
  }

  interface IMakePlaceInactiveOnMutationArguments {
    id: string;
  }

  interface ICreatePlaceOnMutationArguments {
    input: ICreatePlaceInput;
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

  interface ICreatePlaceInput {
    name: string;
    description?: string | null;
    bedroom: number;
    bathroom: number;
    location: IPlaceLocationInput;
    price: number;
    haveInternet: boolean;
    haveAirCond: boolean;
    haveHeating: boolean;
    haveTv: boolean;
    maxGuest: number;
    petsAllowed: boolean;
    photos: Array<string>;
  }

  interface IPlaceLocationInput {
    address: string;
    lat: number;
    lng: number;
  }

  interface IReservation {
    __typename: 'Reservation';
    startDate: string;
    endDate: string;
    price: number;
    total: number;
    place: IPlace;
    user: IUser;
    createdAt: string;
    updatedAt: string;
  }
}

// tslint:enable
