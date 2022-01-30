export type Right<DataType> = { kind: 'right'; data: DataType };
export type Left<ErrorType> = { kind: 'left'; error: ErrorType };
export type Either<DataType, ErrorType> = Right<DataType> | Left<ErrorType>;

export const right = <DataType>(data: DataType): Right<DataType> => ({ kind: 'right', data });
export const left = <ErrorType>(error: ErrorType): Left<ErrorType> => ({ kind: 'left', error });

export const matchWith = <DataType, ErrorType, RightResult, LeftResult>(
  either: Either<DataType, ErrorType>,
  matchingFunctions: {
    right: (result: DataType) => RightResult;
    left: (result: ErrorType) => LeftResult;
  }
) => {
  if (either.kind === 'right') {
    return matchingFunctions.right(either.data);
  }

  return matchingFunctions.left(either.error);
};

export const attempt = <Result>(targetFunction: () => Result) => {
  try {
    return right(targetFunction());
  } catch (error) {
    return left(error);
  }
};

export const attemptAsync = async <Result>(targetFunction: () => Promise<Result>) => {
  try {
    return right(await targetFunction());
  } catch (error) {
    return left(error);
  }
};
