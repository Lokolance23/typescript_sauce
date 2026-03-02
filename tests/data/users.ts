export interface IUser {
  username: string;
  password: string;
}

export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  locked: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performance_glitch: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  error_user: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  visual_user: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
};
