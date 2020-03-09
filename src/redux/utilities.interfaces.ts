export interface IFetchStart<T> {
	type: T;
}

export interface IFetchFailure<T> {
	type: T;
	payload: Error;
}
