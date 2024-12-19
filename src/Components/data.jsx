// data.js
import stout from './img/7-removebg-preview (1).png'
import porter from './img/8-removebg-preview.png'
import brownAle from './img/9-removebg-preview.png'
import paleAle from './img/8-removebg-preview (1).png'
import bitter from './img/11-removebg-preview.png'
import weizen from './img/12-removebg-preview.png'
import mild from './img/13-removebg-preview.png'
import barleyWine from './img/14-removebg-preview.png'
import white from './img/1-removebg-preview.png'
import dark from './img/2-removebg-preview.png'
import cider from './img/3-removebg-preview (1).png'
import ireland from './img/6-removebg-preview.png'
import cz from './img/4-removebg-preview.png'
import usa from './img/5-removebg-preview.png'
import pilsner from './img/10-removebg-preview (1).png'
import darklager from './img/11-removebg-preview (1).png'
import draft from './img/12-removebg-preview (1).png'
import bock from './img/13-removebg-preview (1).png'
import raunch from './img/14-removebg-preview (1).png'
import weizenbier from './img/15-removebg-preview.png'
import lambic from './img/16-removebg-preview.png'
import lightlager from './img/9-removebg-preview (1).png'
import diGoroh from './img/diGoroh.png';
import kingJ from './img/kingJ.jpeg';
import atomPrach from './img/atomPrach.jpeg';
import sovngarde from './img/sovngarde.jpeg';
import bar1 from './img/bar1.jpg'
import bar2 from './img/bar2.jpg'
import bar3 from './img/bar3.jpeg'
import bar4 from './img/bar4.jpg'
import bar5 from './img/bar5.jpeg'
import bar6 from './img/bar6.jpeg'
import bar7 from './img/bar7.jpg'
import bar8 from './img/bar8.jpg'
import bar9 from './img/bar9.jpg'
import bar10 from './img/bar10.jpg'



export const categories = [
  { label: 'Светлое', image: white, id: 'light', description: 'Светлое пиво характеризуется золотистым цветом и легким, освежающим вкусом. Оно обычно имеет низкое содержание алкоголя и подходит для употребления в теплую погоду.' },
  { label: 'Темное', image: dark, id: 'dark', description: 'Темное пиво отличается насыщенным цветом от темно-янтарного до почти черного. Оно обладает богатым, сложным вкусом с нотками карамели, шоколада или кофе.' },
  { label: 'Сидр', image: cider, id: 'cider', description: 'Сидр - это алкогольный напиток, получаемый путем брожения яблочного сока. Он может быть сухим или сладким, с различными фруктовыми нотками.' },
];

export const types = [
  { label: 'Stout', image: stout, id: 'stout', description: 'Темное, плотное пиво с насыщенным вкусом и ароматом, часто с нотками кофе и шоколада.' },
  { label: 'Porter', image: porter, id: 'porter', description: 'Темное пиво с богатым вкусом, сочетающим в себе солодовую сладость и легкую горечь.' },
  { label: 'Brown Ale', image: brownAle, id: 'brown ale', description: 'Пиво коричневого цвета с мягким, слегка ореховым вкусом и карамельными нотками.' },
  { label: 'Pale Ale', image: paleAle, id: 'pale ale', description: 'Светлое пиво с умеренной горечью и фруктово-цитрусовыми ароматами от хмеля.' },
  { label: 'Bitter', image: bitter, id: 'bitter', description: 'Английский эль с выраженной хмелевой горечью и сухим послевкусием.' },
  { label: 'Weizen', image: weizen, id: 'weizen', description: 'Немецкое пшеничное пиво с легким, освежающим вкусом и характерными нотками банана и гвоздики.' },
  { label: 'Mild', image: mild, id: 'mild', description: 'Легкое английское пиво с низким содержанием алкоголя и мягким, слегка сладковатым вкусом.' },
  { label: 'Barley Wine', image: barleyWine, id: 'barley Wine', description: 'Крепкий эль с интенсивным вкусом, сочетающим сладость солода и алкогольное тепло.' },
  { label: 'Light Lager', image: lightlager, id: 'light Lager', description: 'Легкое, освежающее пиво с низкой калорийностью и мягким, чистым вкусом.' },
  { label: 'Draft', image: draft, id: 'draft', description: 'Свежее пиво, подаваемое из кег или бочек, часто более живое и ароматное, чем бутилированное.' },
  { label: 'Rauchbier', image: raunch, id: 'rauchbier', description: 'Немецкое копченое пиво с характерным дымным ароматом и вкусом.' },
  { label: 'Weizenbier', image: weizenbier, id: 'weizenbier', description: 'Немецкое пшеничное пиво с мутноватым видом, фруктовыми ароматами и освежающим вкусом.' },
  { label: 'Lambic', image: lambic, id: 'lambic', description: 'Бельгийское пиво спонтанного брожения с кислым, часто фруктовым вкусом.' },
  { label: 'Pilsner', image: pilsner, id: 'pilsner', description: 'Светлое лагерное пиво с чистым, освежающим вкусом и заметной хмелевой горечью.' },
  { label: 'Dark Lager', image: darklager, id: 'dark lager', description: 'Темное пиво с мягким вкусом, сочетающим карамельные и шоколадные ноты.' },
  { label: 'Bock', image: bock, id: 'bock', description: 'Крепкий лагер с насыщенным солодовым вкусом и минимальной горечью.' }
];

export const countries = [
  { label: 'usa', image: usa },
  { label: 'cz', image: cz },
  { label: 'ireland', image: ireland },
];


export const bars = [
  { 
    id: 1, 
    name: "Пивная №1", 
    lat: 55.790370, 
    lng: 37.523576, 
    beers: [
      { id: "sovngarde", price: 350 },
      { id: "atomnaya", price: 300 }
    ], 
    image: bar1,
    photos: [bar1, bar2, bar3, bar4, bar5],
    website: "https://pivnaya1.com",
    phone: "+7 (123) 456-7890"
  },
  { id: 2, name: "Бар у Васи", lat: 55.863865, lng: 37.607182, rating: 4.5, beers: [{ id: "kingjjj", price: 400 }, { id: "atomnaya", price: 380 }], image: bar2, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
  { id: 3, name: "Пивной дом", lat: 55.7622200, lng: 37.6155600, rating: 4.7, beers: [{ id: "kingjjj", price: 420 }, { id: "atomnaya", price: 400 }], image: bar3, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
  { id: 4, name: "Jawsspot", lat: 55.790360, lng: 37.524076, rating: 4.6, beers: [{ id: "sovngarde", price: 370 }, { id: "sovngarde", price: 370 }], image: bar4, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
  { id: 5, name: "Atom", lat: 55.780370, lng: 37.523580, rating: 4.8, beers: [{ id: "atomnaya", price: 390 }, { id: "gorkovskaya", price: 320 }], image: bar5, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
  { id: 6, name: "Harats", lat: 55.760370, lng: 37.520076, rating: 4.9, beers: [{ id: "gorkovskaya", price: 300 }, { id: "kingjjj", price: 280 }], image: bar6, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
  { id: 7, name: "Pub now", lat: 55.710330, lng: 37.5223576, rating: 4.7, beers: [{ id: "sovngarde", price: 360 }, { id: "gorkovskaya", price: 340 }], image: bar7, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
  { id: 8, name: "Osterio Mario", lat: 55.666370, lng: 37.503576, rating: 4.6, beers: [{ id: "sovngarde", price: 380 }, { id: "kingjjj", price: 310 }], image: bar8, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
  { id: 9, name: "Бамбли би", lat: 55.798070, lng: 37.500576, rating: 4.5, beers: [{ id: "sovngarde", price: 365 }, { id: "atomnaya", price: 305 }], image: bar9, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
  { id: 10, name: "Choose", lat: 55.711370, lng: 37.500576, rating: 4.6, beers: [{ id: "sovngarde", price: 355 }, { id: "atomnaya", price: 385 }], image: bar10, photos: [bar1, bar2, bar3, bar4, bar5], website: "https://pivnaya1.com", phone: "+7 (123) 456-7890"},
];

export const distanceFilters = [
  { value: null, label: 'Все' },
  { value: 1000, label: '10 мин 🚶 - 3 мин 🚖' },
  { value: 3000, label: '30 мин 🚶 - 10 мин 🚖' },
  { value: 5000, label: '30 мин 🚖' },
];

export const userFavorites = {
  '5200228179': ['gorkovskaya', 'atomnaya', 'kingjjj'],
  'user456': ['sovngarde', 'atomnaya'],
  'user789': ['kingjjj', 'gorkovskaya']
};

export const userHistory = {
  'user123': [
    { beerId: 'gorkovskaya', timestamp: '2024-03-15T14:30:00' },
    { beerId: 'atomnaya', timestamp: '2024-03-14T16:20:00' }
  ],
  'user456': [
    { beerId: 'sovngarde', timestamp: '2024-03-15T12:00:00' }
  ]
};


export const beerTypes = [
  { 
    id: 'gorkovskaya', 
    label: 'Gorkovskaya Brewery', 
    labelinfo: '7.5%  75 IBU', 
    image: diGoroh, 
    imageType: 'round',
    description: 'Характерная для стиля горечь, вкус и аромат достигнуты благодаря использованию сортов хмеля CITRA и NORTHERN BREWER',
    categories: ['light'],
    types: [ 'ipa'],
    popularity: 95,
    isNew: true,
    addedDate: '2024-03-15',
    rating: 4.8
  },
  { 
    id: 'atomnaya', 
    label: 'Atomnaya Brewery', 
    labelinfo: '5.0%  45 IBU', 
    image: atomPrach, 
    imageType: 'square',
    description: 'Легкий светлый лагер с мягким солодовым вкусом',
    categories: ['light'],
    types: ['lager'],
    popularity: 88,
    isNew: false,
    addedDate: '2024-01-10',
    rating: 4.5
  },
  { 
    id: 'kingjjj', 
    label: 'King JJJ', 
    labelinfo: '6.5%  60 IBU', 
    image: kingJ, 
    imageType: 'square',
    description: 'Насыщенный темный эль с нотками карамели',
    categories: ['dark'],
    types: ['ale'],
    popularity: 92,
    isNew: true,
    addedDate: '2024-03-10',
    rating: 4.7
  },
  { 
    id: 'sovngarde', 
    label: 'Sovngarde', 
    labelinfo: '4.8%  30 IBU', 
    image: sovngarde, 
    imageType: 'square',
    description: 'Классический светлый лагер в чешском стиле',
    categories: ['light'],
    types: ['stout'],
    popularity: 85,
    isNew: false,
    addedDate: '2023-12-20',
    rating: 4.3
  }
];

// Добавляем данные о любимом пиве пользователей
