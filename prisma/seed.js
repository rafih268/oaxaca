const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { starters, mains, drinks, desserts, users, cardDetails} = require('../data')

const addMenuItem = async (item, category) => {
  await prisma.menuItem.upsert({
    where: { name: item.name },
    update: {},
    create: {
      name: item.name,
      description: item.desc,
      image: item.imgSource,
      price: item.price,
      category: category,
      allergens: {},
    },
  })
}

const addCards = async (item, category) => {
  await prisma.CreditCardDetails.upsert({
    where: { cardNumber: item.cardNumber },
    update: {},
    create: {
      cardNumber: item.cardNumber,
      cardType: item.cardType,
      fullName: item.fullName,
      expiryDate: item.expiryDate,
      cvv: item.cvv,
    },
  })
}


const addUsers = async () => {
  await Promise.all(users.map(async (user) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(user.password, salt)

    return prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        password: hashedPass,
        role: user.role,
      },
    })
  }))
}

const addOrder = async () => {
  return prisma.Order.upsert({
    where: { order_no: 1 },
    update: {},
    create: {
      order_no: 1,
      table_no: 1,
    }
  })
}

async function main() {
  const starterItems = await Promise.all(starters.map((item) => {
    return addMenuItem(item, 'STARTERS')
  }))

  const mainItems = await Promise.all(mains.map((item) => {
    return addMenuItem(item, 'MAINS')
  }))

  const dessertItems = await Promise.all(desserts.map((item) => {
    return addMenuItem(item, 'DESSERTS')
  }))

  const drinkItems = await Promise.all(drinks.map((item) => {
    return addMenuItem(item, 'DRINKS')
  }))

  const cardItems = await Promise.all(cardDetails.map((item) => {
    addCards(item, 'CARDS')
  }))

  await addUsers()
  await addOrder()

  //console.log({ starterItems, mainItems, dessertItems, drinkItems, cardItems})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
