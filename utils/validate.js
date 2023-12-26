import validator from 'validator';

const { isEmpty, isLength, isAlpha, isEmail } = validator;

export const validate = (data) => {
  const name =
    !isEmpty(data?.name ?? '') &&
    isLength(data?.name ?? '', { min: 3, max: undefined }) &&
    isAlpha(data?.name ?? '', 'es-ES');

  if (!name) {
    throw new TypeError('Invalid or missing name');
  }

  const nickname =
    !isEmpty(data?.nickname ?? '') &&
    isLength(data?.nickname ?? '', { min: 3, max: 20 });

  if (!nickname) {
    throw new TypeError('Invalid or missing nickname');
  }

  const email = !isEmpty(data?.email ?? '') && isEmail(data?.email ?? '');

  if (!email) {
    throw new TypeError('Invalid or missing email');
  }

  const password = !isEmpty(data?.password ?? '');

  if (!password) {
    throw new TypeError('Password is empty');
  }

  if (data?.surname) {
    const surname =
      !isEmpty(data?.surname ?? '') &&
      isLength(data?.surname ?? '', { min: 3, max: undefined }) &&
      isAlpha(data?.surname ?? '', 'es-ES');

    if (!surname) {
      throw new TypeError('Invalid surname');
    }
  }

  if (!name || !nickname || !email || !password) {
    throw new TypeError(
      'Invalid or or missing name, email, nickname or password'
    );
  }

  return true;
};
