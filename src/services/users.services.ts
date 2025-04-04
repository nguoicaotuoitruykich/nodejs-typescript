class UsersServices {
  async register(payload: {email: string, password: string})
}

const usersServices = new UsersServices()