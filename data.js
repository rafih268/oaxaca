const starters = [
  {
    id: 1,
    name: 'Tinga',
    desc: 'Shredded chicken with tomatoes, onions and chile chipotle, with queso fresco ranchero.',
    price: 6.5,
    imgSource:
      'https://www.thebossykitchen.com/wp-content/uploads/2018/01/Authentic-Mexican-Tinga-de-Pollo-Chicken-in-Chipotle-Tomato-Sauce88.jpg',
  },

  {
    id: 2,
    name: 'Arrachera',
    desc: 'Beef marinated in beer, onion and garlic with a selection of exotic spices.',
    price: 5.5,
    imgSource:
      'https://www.craftbeering.com/wp-content/uploads/2022/08/Skirt-Steak-Tacos-2.jpg',
  },
  {
    id: 3,
    name: 'Flor De Calabaz',
    desc: 'Poblano pepper strips in a courgette, sweet corn and onion cream sauce, topped with queso fresco ranchero.',
    price: 6.0,
    imgSource:
      'https://1.bp.blogspot.com/-CnLfgb1pNZ0/Vg3_Tw6-G0I/AAAAAAAAUHc/KhgA-9WnN6w/s1600/Squash%2BBlossom_Quesadillas_de%2BFlor%2Bde%2BCalabaza_2_LCDL.jpg',
  },
  {
    id: 4,
    name: 'Pollo Mango Habanero',
    desc: 'Chicken breast glazed with mango habanero sauce. Served with rice and a small salad including avocado.',
    price: 5.5,
    imgSource: 'https://cdn7.kiwilimon.com/recetaimagen/34664/40229.jpg',
  },
  {
    id: 5,
    name: 'Huevos Maxicanos',
    desc: 'Three scrambled eggs, cooked with tomatoes, onions and jalapeno peppers. Served with rice, beans and pico de gallo.',
    price: 6.0,
    imgSource:
      'https://www.maricruzavalos.com/wp-content/uploads/2021/06/huevos_rancheros_recipe.jpg',
  },
]

const mains = [
  {
    id: 1,
    name: 'Black Bean Quesadilla (v)',
    desc: 'With smoky beans and avocado leaf',
    price: 9.5,
    imgSource:
      'https://www.budgetbytes.com/wp-content/uploads/2012/02/Hearty-Black-Bean-Quesadillas-stack.jpg',
  },

  {
    id: 2,
    name: 'Sweet Potato and Feta Taquito (v)',
    desc:
      'With caramelised onion, salsas and chipotle mayo in a crisp blue corn tortilla',
    price: 6.6,
    imgSource:
      'https://production-media.gousto.co.uk/cms/mood-image/785_Feta--Sweet-Potato-Taquitos-1118-1591365759200.jpg',
  },

  {
    id: 3,
    name: 'Beef Burrito',
    desc:
      'Toasted flour tortilla, black beans, green rice, salsas, slaw & crema served with a handful of tortilla chips',
    price: 11.0,
    imgSource: 'https://i.ytimg.com/vi/krkf7ObsTM4/maxresdefault.jpg',
  },

  {
    id: 4,
    name: 'Enchiladas Poblanas',
    desc:
      'Two corn tortillas stuffed and with mixed shredded cheese andfinished with flavorful poblano cream sauce and a touch of mixed shredded cheese',
    price: 10.0,
    imgSource:
      'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0bf43887-c236-4d55-bf7a-f9c73e1735d7/Derivates/ae732a32-dcf0-4b2d-9e5d-6c49447d4a08.jpg',
  },

  {
    id: 5,
    name: 'Fajita, Beef or Vegetable (v)',
    desc:
      'Served on a bed of sautéed bell peppers with caramelized red and white onions accompanied by Mexican rice, refried beans, sour cream, guacamole and pico de gallo',
    price: 11.0,
    imgSource:
      'https://www.jessicagavin.com/wp-content/uploads/2020/06/steak-fajitas-8-1200.jpg',
  },

  {
    id: 6,
    name: 'Chimichanga Ranchera',
    desc:
      'A flavorful filling spooned into a tortilla, rolled and lightly fried until crispy',
    price: 10.0,
    imgSource:
      'https://hamiltonbeach.ca/media/recipes/Chicken-Chimichangas-with-Ranchero-Sauce---24.jpg',
  },

  {
    id: 7,
    name: 'Street Tacos',
    desc:
      'Simple yet tasty, two soft corn tortillas filled with grilled chicken or skirt steak, onions, and cilantro. Served with whole beans, mexican rice and your choice of salsa',
    price: 9.0,
    imgSource:
      'https://therecipecritic.com/wp-content/uploads/2021/07/streettacos-667x1000.jpg',
  },
]

const drinks = [
  {
    id: 1,
    category: 'drinks',
    name: 'Passion Fruit Mojito',
    desc: 'Our classic mojito with a passion fruit twist',
    allergens: ['nuts', 'gluten'],
    calories: 100,
    price: 8.60,
    imgSource:
      'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
  },

  {
    id: 2,
    category: 'drinks',
    name: 'Piña Colada',
    desc: 'Served in a giant pineapple tiki glass',
    allergens: ['gluten'],
    calories: 150,
    price: 8.30,
    imgSource:
      'https://www.wearesovegan.com/wp-content/uploads/2017/05/SV_PinaColada_Header1.jpg',
  },

  {
    id: 3,
    category: 'drinks',
    name: 'Pacifico',
    desc: 'Classic Mexican beer, best enjoyed with a lime',
    allergens: 'Gluten',
    calories: 150,
    price: 5.30,
    imgSource:
      'https://bajaalive.com/wp-content/uploads/2021/04/pacifico-beer-and-beach.jpg',
  },

  {
    id: 4,
    category: 'drinks',
    name: 'Anejo Tequila',
    desc: 'Aged in oak barrels for up to three years - caramel, vanilla, and butterscotch flavours',
    allergens: ['gluten'],
    calories: 150,
    price: 5.70,
    imgSource:
      'https://olmecatequila.com/wp-content/uploads/2021/10/shot-of-tequila.jpg',
  },

  {
    id: 5,
    category: 'drinks',
    name: 'Frozen Strawberry Daquiri',
    desc: 'Bacardi Carta Blanca Rum, lime juice and strawberry purée',
    allergens: ['gluten'],
    calories: 150,
    price: 8.70,
    imgSource:
      'https://www.willcookforsmiles.com/wp-content/uploads/2022/06/Strawberry-Daiquiri-3.jpg',
  },

  {
    id: 6,
    category: 'drinks',
    name: 'Berry Agua Fresca',
    desc: 'Strawberry & raspberry puree blended with lime juice',
    allergens: ['gluten'],
    calories: 140,
    price: 4.20,
    imgSource:
      'https://celebratingsweets.com/wp-content/uploads/2017/05/Berry-Agua-Fresca-1-2.jpg',
  },

  
]

const desserts = [
  {
    id: 1,
    name: 'Red velvet',
    desc:
      'Three moist layers of stunning red Velvet filled and topped silky cream cheese icing and finished with melt-in-your-mouth white and dark chocolate shavings and white chocolate drizzle.',
    price: 5.5,
    imgSource:
      'https://www.recipetineats.com/wp-content/uploads/2016/06/Red-Velvet-Layer-Cake_4.jpg',
  },
  {
    id: 2,
    name: 'Black  forest',
    desc:
      'Beautiful Black Forest Cake covered in whipped cream and chocolate.',
    price: 5.5,
    imgSource:
      'https://thebananadiaries.com/wp-content/uploads/2022/05/vegan-black-forest-cake_6265.jpg',
  },
  {
    id: 3,
    name: 'Vanilla Ice Cream',
    desc:
      'Super-smooth and creamy. Spot-on vanilla flavored ice cream. Oh-so cold and refreshing.',
    price: 4.0,
    imgSource:
      'https://static.toiimg.com/thumb/63971154.cms?width=573&height=430',
  },
  {
    id: 4,
    name: 'Chocolate Ice Cream',
    desc:
      'Indulge in the rich, creamy taste of our homemade chocolate ice cream. Made with only the finest coca and cream, this classic dessert is sure to satisfy and chocolate craving. Available in a single scoop or as port of a sundae',
    price: 4.95,
    imgSource:
      'https://www.thespruceeats.com/thmb/T_Mru3-k0Zl9fqDaprCn2bjhek4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/easy-chocolate-ice-cream-recipe-1945798-hero-01-45d9f26a0aaf4c1dba38d7e0a2ab51e2.jpg',
  },
  {
    id: 5,
    name: 'Snowball cookies',
    desc:
      'Our delicate and fluffy snowball cookies are the perfect treat for any occasion. Made with buttery shortbread and dusted with powdered sugar, these cookies mely in your mouth with every bite. Perfectly paired with a hot cup of coffee or tea.',
    price: 5.5,
    imgSource:
      'https://cafedelites.com/wp-content/uploads/2018/12/snowball-cookies-6.jpg',
  },
  {
    id: 6,
    name: 'Mexican brownies',
    desc:
      'Our Mexican brownies are a unique and delicious twist on the traditional brownie.',
    price: 6.95,
    imgSource:
      'https://www.isabeleats.com/wp-content/uploads/2020/12/mexican-brownies-small-6.jpg',
  },
  {
    id: 7,
    name: 'Churros',
    desc:
      'Our traditional Mexican churros are freshly made to order and served with a side of warm chocolate dipping sauce. Available in a plate of 6 or 12.',
    price: 4.0,
    imgSource:
      'https://cafedelites.com/wp-content/uploads/2020/05/Churros-Recipe-IMAGE-124.jpg',
  },
  {
    id: 8,
    name: 'Caramel Flan',
    desc:
      'Indulge in our rich and creamy caramel flan, a classic Mexican dessert made with sweet caramel, eggs, and milk.',
    price: 5.0,
    imgSource:
      'https://spanishsabores.com/wp-content/uploads/2020/05/Spanish-Flan-7380-Blog.jpg',
  },
]

const cardDetails = [
  {
    cardType: "visa-debit",
    cardNumber: "1111222233334444",
    fullName: "veritas satirev",
    expiryDate: "2020-03-19T12:21:00.000Z",
    cvv: 123
  },
  {
    cardType: "master-debit",
    cardNumber: "1111333311114444",
    fullName: "ruen suiyan",
    expiryDate: "2020-03-19T12:21:00.000Z",
    cvv: 520
  },
  {
    cardType: "visa-credit",
    cardNumber: "0132218652132567",
    fullName: "stellar ralleta",
    expiryDate: "2021-03-19T12:21:00.000Z",
    cvv: 999
  }
]

const users = [
  {
    email: 'customer@example.com',
    name: 'CUSTOMER',
    password: 'customer',
    role: 'CUSTOMER',
  },
  {
    email: 'kitchenstaff@example.com',
    name: 'KITCHEN_STAFF',
    password: 'kitchenstaff',
    role: 'KITCHEN_STAFF',
  },
  {
    email: 'waiter@example.com',
    name: 'WAITER',
    password: 'waiter',
    role: 'WAITER',
  },
  {
    email: 'manager@example.com',
    name: 'MANAGER',
    password: 'manager',
    role: 'MANAGER',
  },
]

module.exports = {
  starters,
  mains,
  drinks,
  desserts,
  cardDetails,
  users,
}