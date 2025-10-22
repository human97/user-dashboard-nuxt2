import users from './users';

const api = {
  users,
};

export default (context, inject) => {
  inject('api', api);
};