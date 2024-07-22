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

export const beerTypes = [
  { label: 'Gorkovskaya Brewery', labelinfo: '7.5%  75 IBU', image: diGoroh, imageType: 'round', description: 'Характерная для стиля горечь, вкус и аромат достигнуты благодаря использованию сортов хмеля CITRA и NORTHERN BREWER', categories: ['light', 'ipa'] },
  { label: 'King JJJuliusss', labelinfo: '8.4%  N/A IBU', image: kingJ, imageType: 'square', description: 'Манго, апельсин и сладкий грейпфрут преобладают в аромате с намеками на ананас и смешанный сок тропических фруктов. Вкус повторяет аромат с сочным ощущением во рту и правильной горечью.', categories: 'light' },
  { label: 'Атомная Прачечная XX', labelinfo: '9%  130 IBU', image: atomPrach, imageType: 'square', description: 'Не двойная прачка. Это «Атомная Прачечная», сваренная в стиле Double IPA: еще больше хмеля, еще мощне солодовая база и карамельный акцент, еще плотнее вкус', categories: 'light' },
  { label: 'Sovngarde', labelinfo: '8%  65 IBU', image: sovngarde, imageType: 'square', description: 'Насыщенный цветочно-цитрусовый аромат грейпфрута и апельсина и крепкий солодовый вкус с нежными тропическими нотками.', categories: 'dark' },
  { label: 'Темное', labelinfo: '7.5%  75 IBU', image: dark, imageType: 'square', description: 'Описание для Темное', category: 'dark' },
  { label: 'Сидр', labelinfo: '7.5%  75 IBU', image: cider, imageType: 'square', description: 'Описание для Сидр', category: 'cider' },
];

export const bars = [
  { id: 1, name: "Пивная №1", lat: 55.790370, lng: 37.523576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 2, name: "Бар у Васи", lat: 55.863865, lng: 37.607182, beers: ["King JJJuliusss", "Gorkovskaya Brewery", "Сидр"] },
  { id: 3, name: "Пивной дом", lat: 55.7622200, lng: 37.6155600, beers: ["Атомная Прачечная XX", "Sovngarde"] },
  { id: 4, name: "Jawsspot", lat: 55.790360, lng: 37.524076, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 5, name: "Atom", lat: 55.780370, lng: 37.523580, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 6, name: "Harats", lat: 55.760370, lng: 37.520076, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 7, name: "Pub now", lat: 55.710330, lng: 37.5223576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 8, name: "Osterio Mario", lat: 55.666370, lng: 37.503576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 9, name: "Бамбли би", lat: 55.798070, lng: 37.500576, beers: ["Gorkovskaya Brewery", "Темное"] },
  { id: 10, name: "Choose", lat: 55.711370, lng: 37.500576, beers: ["Gorkovskaya Brewery", "Темное"] },
];

export const distanceFilters = [
  { value: null, label: 'Все' },
  { value: 1000, label: '10 мин 🚶 - 3 мин 🚖' },
  { value: 3000, label: '30 мин 🚶 - 10 мин 🚖' },
  { value: 5000, label: '30 мин 🚖' },
];
