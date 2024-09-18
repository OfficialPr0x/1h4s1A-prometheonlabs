import { Database } from '../../../core/database'

class Service {
  /**
   * This function is called when a new user sign up, you can use it to send welcome email for ex
   */
  async onRegistration(userId: string) {
    const database = await Database.getUnprotected()

    const user = await database.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return
    }

    const organization = await database.organization.findFirst({
      where: { roles: { some: { userId: user.id } } },
    })

    if (organization) {
      return
    }

    await database.organization.create({
      data: {
        name: `${user.name.split(' ')[0]}'s Team`,
        roles: {
          create: {
            userId: user.id,
            name: 'owner',
          },
        },
      },
    })
  }
}

class Singleton {
  static service = new Service()
}

export const RegistrationService = Singleton.service
