const { PrismaClient } = require("@prisma/client")
const { ROLES } = require("../src/lib/constants.lib")

const db = new PrismaClient();

const main = async () => {
  await db.role.createMany({
    data: [
      {
        id: ROLES.MEMBER,
        name: "member"
      },
      {
        id: ROLES.ADMIN,
        name: "admin"
      },
      {
        id: ROLES.CUSTOMERS_SERVICE,
        name: "customers service"
      },
    ]
  })
}

main()
