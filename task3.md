======================================
По аналогии с примером «Котокафе» из предыдущей статьи реализуйте страницу покупки на проекте «Фермерские продукты».
https://www.figma.com/file/CXOyZGW7suelJAT8uO0Lxg/%F0%9F%A7%91_%F0%9F%8C%BE%D0%A4%D0%B5%D1%80%D0%BC%D0%B5%D1%80%D1%81%D0%BA%D0%B8%D0%B9-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD?type=design&node-id=0-1&mode=design

Создайте компонент под страницу оформления заказа.
Создайте компоненты для блока «Выберите продукты». Цена продукта должна пересчитываться в процессе с учётом отобранных продуктов. Также при выборе продукта слайдер справа должен автоматически прокручиваться так, чтобы показывать пользователю данные о текущем товаре.
Создайте компоненты с детальным списком продуктов — он располагается справа в макете. Для реализации нужно использовать Swiper. Чтобы было удобнее, отобразите в слайдере полосу прокрутки. При выборе конкретного продукта слайдер должен автоматически прокручиваться к информации о нём. Но если галочка с выбранного продукта снимается, слайдер прокручивать не нужно.
Реализуйте табы в карточках товара. Контент таба должен иметь фиксированную высоту, как и сама карточка.
Реализуйте компоненты для плашки «Создать заказ». Поле адреса представляет собой обычный текстовый input.
Реализуйте логику по оставлению кнопки «Купить» неактивной до тех пор, пока поле адреса не окажется заполненным и пока не будет выбран хотя бы один продукт из списка.
По нажатию на кнопку «Купить» необходимо через alert вывести информацию о заказе.

Шаг 1. Создадим страницу оформления заказа
По аналогии с примером «Котокафе» реализуйте страницу покупки на проекте «Фермерские продукты».

Создадим в директории pages компонент Order по аналогии с MainPage. Пока компонент будет пустым, позже мы станем добавлять в него блоки, превращая в страницу, изображённую на макетах. Подключим Order вместо MainPage в PageWrapper, чтобы теперь на странице отображался компонент Order, и нам было легче его разрабатывать.
https://codesandbox.io/s/5-17-1-forked-8jprks?file=/src/components/layout/page-wrapper/page-wrapper.jsx:145-200

Шаг 2. Разметка страницы
Страница оформления заказа состоит из двух колонок: левой и правой. В левой колонке вверху располагается панель с выбором продуктов, а внизу — панель для оформления заказа. В правой колонке находится слайдер, в котором каждый слайд является детальным описанием продукта.

Наметим эти элементы в компоненте Order:
import React from "react";
import Panel from "/src/components/ui/panel/panel";
import Title, { TitleSize } from "/src/components/ui/title/title";
import Button from "/src/components/ui/button/button";
import {
LeftColumn,
StyledOrder,
AddressInput,
PriceLabel,
PriceValue
} from "./styles";

// Оформление заказа
function Order() {
return (
<StyledOrder as="form">
<LeftColumn>
<Panel marginBottom={20} paddingTop={24} paddingBottom={10}>

<Title as="h2" size={TitleSize.EXTRA_SMALL} marginBottom={12}>
Выберите продукты
</Title>
Чекбокс со списком продуктов
</Panel>
<Panel>
<Title size={TitleSize.EXTRA_SMALL} marginBottom={24}>
Сделать заказ
</Title>
<AddressInput placeholder="Введите адрес доставки" />
<PriceLabel as="span">Цена</PriceLabel>
<PriceValue>400</PriceValue>
<Button maxWidth>Купить</Button>
</Panel>
</LeftColumn>
<div>Сюда нужно добавить слайдер с продуктами</div>
</StyledOrder>
);
}

export default Order;

Чтобы сделать Order было легче, мы добавили несколько дополнительных компонентов.

Panel — добавляет стили к Section так, чтобы она выглядела как панель в макете:

import styled from "styled-components";
import { Section } from "/src/components/styled";

export const Panel = styled(Section)`padding: ${(props) => props.theme.indent}; padding-top: ${(props) =>`\${props.paddingTop}px`|| props.theme.indent}; padding-bottom: ${(props) =>`\${props.paddingBottom}px`|| props.theme.indent}; border: 1px solid rgba(0, 0, 0, 0.1); box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.04), 0 0 1px rgba(0, 0, 0, 0.04); margin-bottom: ${(props) => props.marginBottom || 0}px; width: ${(props) => props.$width || "auto"}; display: block; background-color: ${(props) => props.theme.colorWhite};`;

export default Panel;

Компонент TextInput стилизует элемент ввода:

import styled from "styled-components";

export const TextInput = styled.input`
display: flex;
height: 48px;
width: 100%;
background-color: \${(props) => props.theme.backgroundColorGray};
border: 1px solid rgba(0, 0, 0, 0.1);
box-sizing: border-box;
padding-left: 12px;
padding-right: 12px;
font-size: 14px;

::placeholder {
color: \${(props) => props.theme.fontColorBlack};
}
`;

export default TextInput;

Компонент Label стилизует HTML-элемент label:

import styled from "styled-components";

const Label = styled.label`display: block;`;

export default Label;

!добавить label в index.js в папке styled

В итоге получится вот так.
https://codesandbox.io/s/5-17-2-forked-8hdnfy?file=/src/components/pages/order/order.jsx

Шаг 3. Добавим моковые данные
Подготовим моковые данные c информацией о продуктах для оформления заказа.

Создадим файл products в директории mocks:

const products = [
{
id: 0,
name: 'Филе бедра цыпленка',
description: 'Филе бедра без кожи и кости. Птица содержится в свободных птичниках, выращивается на натуральных зерновых кормах, что влияет положительно на вкус мяса. Филейная часть бедра обладает насыщенным вкусом и мясным ароматом.',
price: 400,
weight: 700,
image: 'https://i.ibb.co/QHNkcKM/Rectangle-2.png',
specifications: [
{
property: 'Масса',
value: '0,7 кг. (595-805 г.).',
},
{
property: 'Срок годности',
value: '6 суток',
},
{
property: 'Порода',
value: 'Кобб 500ю',
},
{
property: 'Место происхождения',
value: 'Тверская область',
},
],
structure: [
{
property: 'Энергетическая ценность',
value: '135 ккал./565 кДж',
},
{
property: 'Пищевая ценность',
value: 'белки - 13,8 г., жиры - 8,7 г., углеводы - 0 г.; на 100 г.',
},
],
},
{
id: 1,
name: 'Филе бедра гуся',
description: 'Филе бедра гуся - это тонко нарезанный продукт, который понравится всем любителям сырокопченых продуктов. Необычный вкус, аппетитный аромат и тонкое послевкусие отличает сырокопченого гуся от других подобных продуктов.',
price: 500,
weight: 600,
image: 'https://i.ibb.co/dc3H13G/Rectangle-2-1.png',
specifications: [
{
property: 'Масса',
value: '0,6 кг. (495-705 г.).',
},
{
property: 'Срок годности',
value: '5 суток',
},
{
property: 'Порода',
value: 'Кобб 200ю',
},
{
property: 'Место происхождения',
value: 'Тверская область',
},
],
structure: [
{
property: 'Энергетическая ценность',
value: '335 ккалю./765 кДж',
},
{
property: 'Пищевая ценность',
value: 'белки - 13,8 г., жиры - 18,7 г., углеводы - 0 г.; на 100 г.',
},
],
},
{
id: 2,
name: 'Сыр "Амст" с пажитником',
description: 'Базовый полутвердый сыр. Благодаря семенам пажитника, сыр приобретает ореховое послевкусие, которое идеально сочетается со сливочными нотками. Выдержка 1 месяц.',
price: 400,
weight: 300,
image: 'https://i.ibb.co/ZYDZjJk/2.jpg',
specifications: [
{
property: 'Масса',
value: '0,3 кг.',
},
{
property: 'Срок годности',
value: '30 суток',
},
{
property: 'Жирность',
value: '45%',
},
{
property: 'Условия хранения',
value: 'от 0 до 10 °С.',
},
{
property: 'Место происхождения',
value: 'Тверская область',
},
],
structure: [
{
property: 'Энергетическая ценность',
value: ' 323 ккал. / 1407 кДж.',
},
{
property: 'Пищевая ценность',
value: 'белки - 25,2 г., жиры - 27 г., углеводы - 3,6 г. на 100 г.',
},
],
},
{
id: 3,
name: 'Сыр "Камамбер"',
description: 'Мягкий сыр из пастеризованного коровьего молока с добавлением культур белой плесени.',
price: 390,
weight: 200,
image: 'https://i.ibb.co/4TCJV5r/3.jpg',
specifications: [
{
property: 'Масса',
value: '0,2 кг.',
},
{
property: 'Срок годности',
value: '30 суток',
},
{
property: 'Жирность',
value: '50%',
},
{
property: 'Условия хранения',
value: 'от 5 до 8 °С.',
},
{
property: 'Место происхождения',
value: 'Сергиев Посад',
},
],
structure: [
{
property: 'Энергетическая ценность',
value: ' 303 ккал. / 1407 кДж.',
},
{
property: 'Пищевая ценность',
value: 'белки - 25,2 г., жиры - 27 г., углеводы - 3,6 г. на 100 г.',
},
],
},
{
id: 4,
name: 'Мед майский горный.',
description: 'Мед урожая 2021 года. Необычно нежный майский мед, собранный в субтропических рощах Северо-кавказского заповедника, раскрывается целой гаммой цитрусовых оттенков.',
price: 590,
weight: 200,
image: 'https://i.ibb.co/2jS02Jk/4.jpg',
specifications: [
{
property: 'Масса',
value: '0,2 кг.',
},
{
property: 'Срок годности',
value: '24 месяца',
},
{
property: 'Условия хранения',
value: 'от 5 до 20 °С.',
},
],
structure: [
{
property: 'Энергетическая ценность',
value: ' 303 ккал. / 1407 кДж.',
},
{
property: 'Пищевая ценность',
value: 'белки - 25,2 г., жиры - 27 г., углеводы - 3,6 г. на 100 г.',
},
],
},
];

export default products;

Пробросим данные от компонента App до Order по аналогии с тем, как пробрасывались данные о котах на главной странице.
https://codesandbox.io/s/5-17-3-forked-pw5ptw?file=/src/components/pages/order/order.jsx

Шаг 4. Реализация слайдера
Реализуем слайдер на странице оформления заказа.

Для этого воспользуемся библиотекой Swiper.
Добавим её в проект и импортируем нужные модули в компонент Order:

import { SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel, Scrollbar } from "swiper/core";
import "swiper/swiper-bundle.min.css";

Инициализируем компоненты слайдера:
SwiperCore.use([Mousewheel, Pagination, Scrollbar]);

Заменим <div>Сюда нужно добавить слайдер с продуктами</div> на слайдер, созданный на основе Swiper:
<ProductSwiper
spaceBetween={12}
direction="vertical"
slidesPerView="auto"
scrollbar={{ draggable: true }}
mousewheel
pagination={{
          type: "fraction"
        }} >
{products.map((product) => (
<SwiperSlide key={product.id}>
<ProductCart product={product} />
</SwiperSlide>
))}
</ProductSwiper>
Здесь ProductSwiper — это просто стилизованный компонент Swiper:
export const ProductSwiper = styled(Swiper)`
width: 727px;

.swiper-pagination {
display: none;
}

.swiper-slide {
flex-shrink: 1;
}
`;

А компонент ProductCart нужно создать отдельно и подключить в компонент Order.

Пока ProductCart в директории ui, сделаем его без табов:
import React from "react";
import Panel from "/src/components/ui/panel/panel";
import { TitleSize } from "/src/components/ui/title/title";
import { ProductImage, ProductTitle, Price, ContentWrapper } from "./styles";

function ProductCart({ product }) {
return (
<Panel>
<ProductImage src={product.image} />
<ContentWrapper>
<ProductTitle as="h3" size={TitleSize.SMALL}>
{product.name}
</ProductTitle>
<Price>
{product.price} руб. / {product.weight} гр.
</Price>
</ContentWrapper>
</Panel>
);
}

export default ProductCart;

Получим
https://codesandbox.io/s/5-17-4-forked-323gsr?file=/src/components/pages/order/order.jsx

Шаг 5. Реализация табов
Теперь добавим табы в карточки товаров.

Для этого в директории ui создадим компонент Tabs, точно так же, как и во время тренировки:
import React, { useState } from "react";
import { TabButton, Header, Content, TabListItem } from "./styles";

function Tabs({ tabsList = [], maxContentHeiht }) {
const [selectIndex, setSelectIndex] = useState(0);

return (

<div>
<Header>
{tabsList.map((tab, index) => (
<TabListItem key={`tab${index * 10}`}>
<TabButton
$isSelect={selectIndex === index}
              {...(selectIndex === index
                ? { as: "span" }
                : {
                    onClick: () => {
                      setSelectIndex(index);
                    }
                  })}
            >
              {tab.title}
            </TabButton>
          </TabListItem>
        ))}
      </Header>
      <Content $maxContentHeiht={maxContentHeiht}>
{tabsList[selectIndex].content}
</Content>
</div>
);
}

export default Tabs;

И стилизованные компоненты для него:
создаем компонет button в папке styled

import styled, { css } from "styled-components";
import { Button, Ul, Li } from "/src/components/styled";

export const TabListItem = styled(Li)`
margin-right: 8px;

&:last-child {
margin-right: 0;
}
`;

export const TabButton = styled(Button)`padding-left: 12px; padding-right: 12px; padding-top: 8px; padding-bottom: 8px; font-size: 14px; line-height: 1.5; font-weight: 400; ${(props) => props.$isSelect ? css`
background-color: ${props.theme.panelBackgroundColor};
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: ${props.theme.colorWhite};
`: css`
background-color: ${props.theme.backgroundColorGray};
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: ${props.theme.fontColorBlack};
`}`;

export const Header = styled(Ul)`display: flex; margin-bottom: 16px;`;

export const Content = styled.div`font-size: 14px; text-align: left; max-height: ${(props) => props.$maxContentHeiht || "none"}; overflow-y: overlay;`;

Согласно макету, контент внутри табов выглядит как ключ-значение. Для отображения такого содержимого создадим компонент OptionsList, который на входе будет принимать массив объектов со свойствами property и value и выводить их в виде списка ключ-значений, разделённых delimeter:
import React from "react";
import { Ul } from "/src/components/styled";
import { Option, Property } from "./styles";

// Логотип сайта с названием
function OptionsList({ list = [], delimeter = ": " }) {
return (

<Ul>
{list.map((option, index) => (
<Option key={`tab${index * 10}`}>
<Property>
{option.property}
{delimeter}
</Property>
{option.value}
</Option>
))}
</Ul>
);
}

export default OptionsList;

Теперь подключим Tabs и OptionsList в ProductCard и используем для отображения контента.

Для этого сначала опишем пропсы для Tabs:
const tabsList = [
{
title: "Oписание",
content: product.description
},
{
title: "Характеристики",
content: <OptionsList list={product.specifications} />
},
{
title: "Свойства",
content: <OptionsList list={product.structure} />
}
];

А потом передадим их в Tabs:
<Tabs maxContentHeiht="105px" tabsList={tabsList} />

В результате код компонента ProductCard будет выглядеть так:
import React from "react";
import Panel from "/src/components/ui/panel/panel";
import { TitleSize } from "/src/components/ui/title/title";
import { ProductImage, ProductTitle, Price, ContentWrapper } from "./styles";
import Tabs from "/src/components/ui/tabs/tabs";
import OptionsList from "/src/components/ui/options-list/options-list";

function ProductCart({ product }) {
const tabsList = [
{
title: "Oписание",
content: product.description
},
{
title: "Характеристики",
content: <OptionsList list={product.specifications} />
},
{
title: "Свойства",
content: <OptionsList list={product.structure} />
}
];
return (
<Panel>
<ProductImage src={product.image} />
<ContentWrapper>
<ProductTitle as="h3" size={TitleSize.SMALL}>
{product.name}
</ProductTitle>
<Tabs maxContentHeiht="105px" tabsList={tabsList} />
<Price>
{product.price} руб. / {product.weight} гр.
</Price>
</ContentWrapper>
</Panel>
);
}

export default ProductCart;

Получим
https://codesandbox.io/s/5-17-5-forked-y445pw?file=/src/components/ui/product-cart/product-cart.jsx:0-1085

Шаг 6. Реализация списка выбора продуктов
Сделаем список выбора продуктов.

Для этого создадим компонент Checkbox на основе VisuallyHiddenInput. Checkbox так же, как и в других примерах, будет получать в props компонент LabelComponent и отрисовывать его на месте чекбокса:
import React from "react";
import { Label, VisuallyHiddenInput } from "/src/components/styled";

// чекбокс
function Checkbox({
onClick,
labelComponent, // Компонент для отображения label
isChecked, // выбрано ли значение
name, // имя
value, // значение
text, // текст элемента
onChange, // событие при изменении
...props
}) {
const LabelComponent = labelComponent;

return (
<Label>
<VisuallyHiddenInput
value={value}
checked={isChecked}
name={name}
onChange={() => onChange(value)}
{...props}
type="checkbox"
/>
<LabelComponent onClick={() => onClick(value)} \$isChecked={isChecked}>
{text}
</LabelComponent>
</Label>
);
}

export default Checkbox;

А также создадим компонент CheckboxList для работы со списком чекбоксов:

import React from "react";
import Checkbox from "/src/components/ui/checkbox/checkbox";
import { Ul, Li } from "/src/components/styled";

// Радиокнопка
function CheckboxList({
selectValues, // массив выбранных значений
labelComponent, // компонент для отображения label
options, // массив с объектами для выбора {title: заголовок, value: значение}
name, // имя
onChange, // событие при изменении
isGridList,
onClickLabel = () => {}
}) {
const handleChange = (value) => {
const newValue = [...selectValues];
const indexValue = newValue.indexOf(value);
if (indexValue !== -1) {
newValue.splice(indexValue, 1);
} else {
newValue.push(value);
}
onChange && onChange(newValue);
};

return (

<Ul \$isGridList={isGridList}>
{options.map((option, index) => (
<Li key={option.value}>
<Checkbox
labelComponent={labelComponent}
selectValues={selectValues}
isChecked={selectValues.includes(option.value)}
name={name}
value={option.value}
text={option.title}
onClick={(value) => onClickLabel(value, index)}
onChange={handleChange}
/>
</Li>
))}
</Ul>
);
}

export default CheckboxList;

Теперь в компоненте Order можно вывести список выбора продуктов.

Для этого заведём состояние, в котором будет храниться список выбранных продуктов:
const [selectProductIds, setSelectProductIds] = useState([]);

И встроим сам список:

<CheckboxList
labelComponent={CheckboxLabel}
name={"select-products"}
isGridList={false}
options={products.map((product) => ({
value: product.id,
title: product.name
}))}
selectValues={selectProductIds}
onChange={setSelectProductIds}
/>

Добавляем импорты useState, CheckboxList, CheckboxLabel.
В результате компонент Order будет выглядеть вот так:

import React, { useState } from "react";
import Panel from "/src/components/ui/panel/panel";
import Title, { TitleSize } from "/src/components/ui/title/title";
import ProductCart from "/src/components/ui/product-cart/product-cart";
import Button from "/src/components/ui/button/button";
import CheckboxList from "/src/components/ui/checkbox-list/checkbox-list";
import {
LeftColumn,
StyledOrder,
AddressInput,
PriceLabel,
PriceValue,
ProductSwiper,
CheckboxLabel
} from "./styles";
import { SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel, Scrollbar } from "swiper/core";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Mousewheel, Pagination, Scrollbar]);

// Оформление заказа
function Order({
products // список продуктов
}) {
const [selectProductIds, setSelectProductIds] = useState([]);

return (
<StyledOrder as="form">
<LeftColumn>
<Panel marginBottom={20} paddingTop={24} paddingBottom={10}>

<Title as="h2" size={TitleSize.EXTRA_SMALL} marginBottom={12}>
Выберите продукты
</Title>
<CheckboxList
labelComponent={CheckboxLabel}
name={"select-products"}
isGridList={false}
options={products.map((product) => ({
value: product.id,
title: product.name
}))}
selectValues={selectProductIds}
onChange={setSelectProductIds}
/>
</Panel>
<Panel>
<Title size={TitleSize.EXTRA_SMALL} marginBottom={24}>
Сделать заказ
</Title>
<AddressInput placeholder="Введите адрес доставки" />
<PriceLabel as="span">Цена</PriceLabel>
<PriceValue>400</PriceValue>
<Button maxWidth>Купить</Button>
</Panel>
</LeftColumn>
<ProductSwiper
spaceBetween={12}
direction="vertical"
slidesPerView="auto"
scrollbar={{ draggable: true }}
mousewheel
pagination={{
          type: "fanction"
        }} >
{products.map((product) => (
<SwiperSlide key={product.id}>
<ProductCart product={product} />
</SwiperSlide>
))}
</ProductSwiper>
</StyledOrder>
);
}

export default Order;

получим:
https://codesandbox.io/s/5-17-6-forked-k3dtr3?file=/src/components/pages/order/order.jsx

Шаг 7. Связь списка продуктов и слайдера
Теперь нужно связать список продуктов со слайдером так, чтобы при клике на элемент в списке открывалось соответствующее детальное описание продукта в слайдере.

Для этого заведём в компоненте Order состояние, хранящее слайдер:

const [swiperRef, setSwiperRef] = useState(null);

Теперь нужно по клику на элемент из списка проверить, был ли продукт уже выбран. Если нет и по нажатию кнопки всё же происходит выбор продукта, то нужно автоматически прокрутить слайдер к нему, чтобы детальное описание товара сразу стало доступно пользователю.

В результате обработчик handleOnClickProduct будет выглядеть так:
const handleOnClickProduct = (value, index) => {
if (!selectProductIds.includes(value)) {
swiperRef.slideTo(index, 0);
}
};

Свяжем swiperRef со слайдером, передав setSwiperRef в ProductSwiper через props onSwiper.

А handleOnClickProduct передадим в props onClickLabel компоненту CheckboxList.

В результате order примет вид:

import React, { useState } from "react";
import Panel from "/src/components/ui/panel/panel";
import Title, { TitleSize } from "/src/components/ui/title/title";
import ProductCart from "/src/components/ui/product-cart/product-cart";
import Button from "/src/components/ui/button/button";
import CheckboxList from "/src/components/ui/checkbox-list/checkbox-list";
import {
LeftColumn,
StyledOrder,
AddressInput,
PriceLabel,
PriceValue,
ProductSwiper,
CheckboxLabel
} from "./styles";
import { SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel, Scrollbar } from "swiper/core";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Mousewheel, Pagination, Scrollbar]);

// Оформление заказа
function Order({
products // список продуктов
}) {
const [swiperRef, setSwiperRef] = useState(null);
const [selectProductIds, setSelectProductIds] = useState([]);
const handleOnClickProduct = (value, index) => {
if (!selectProductIds.includes(value)) {
swiperRef.slideTo(index, 0);
}
};
return (
<StyledOrder as="form">
<LeftColumn>
<Panel marginBottom={20} paddingTop={24} paddingBottom={10}>

<Title as="h2" size={TitleSize.EXTRA_SMALL} marginBottom={12}>
Выберите продукты
</Title>
<CheckboxList
labelComponent={CheckboxLabel}
name={"select-products"}
isGridList={false}
options={products.map((product) => ({
value: product.id,
title: product.name
}))}
selectValues={selectProductIds}
onChange={setSelectProductIds}
onClickLabel={handleOnClickProduct}
/>
</Panel>
<Panel>
<Title size={TitleSize.EXTRA_SMALL} marginBottom={24}>
Сделать заказ
</Title>
<AddressInput placeholder="Введите адрес доставки" />
<PriceLabel as="span">Цена</PriceLabel>
<PriceValue>400</PriceValue>
<Button maxWidth>Купить</Button>
</Panel>
</LeftColumn>
<ProductSwiper
onSwiper={setSwiperRef}
spaceBetween={12}
direction="vertical"
slidesPerView="auto"
scrollbar={{ draggable: true }}
mousewheel
pagination={{
          type: "fanction"
        }} >
{products.map((product) => (
<SwiperSlide key={product.id}>
<ProductCart product={product} />
</SwiperSlide>
))}
</ProductSwiper>
</StyledOrder>
);
}

export default Order;

получим:
https://codesandbox.io/s/5-17-7-forked-d6h2gn?file=/src/components/pages/order/order.jsx

Шаг 8. Вычисление цены
Вычислим цену покупки на основе выбранных продуктов.

id выбранных продуктов хранятся в selectProductIds, а массив продуктов — в props products. Таким образом, список выбранных товаров можно получить через:
const selectProducts = selectProductIds
.map((id) => products
.find((product)=>product.id === id));

А дальше можно вычислить цену этих продуктов:
//цена покупки
const fullPrice = selectProducts.reduce((sum, product) => sum += product.price, 0);
Полученную стоимость выведем в панели оформления заказа, но перед этим создадим компонент Price, который будет правильно форматировать и выводить цену:
import React from "react";
import { StyledPrice } from "./styles";

const formatPrice = (value) => {
const roundedPrice = Math.round(value);
return roundedPrice.toString().replace(/(\d)(?=(\d\d\d)+$)/, "$1 ");
};

// Отформатированная цена
function Price({ value, className }) {
return (
<StyledPrice className={className}>{formatPrice(value)} руб.</StyledPrice>
);
}

export default Price;

Выведем полученную цену в оформление заказа, используя Price:

import React, { useState } from "react";
import Panel from "/src/components/ui/panel/panel";
import Title, { TitleSize } from "/src/components/ui/title/title";
import ProductCart from "/src/components/ui/product-cart/product-cart";
import Button from "/src/components/ui/button/button";
import CheckboxList from "/src/components/ui/checkbox-list/checkbox-list";

import {
LeftColumn,
StyledOrder,
AddressInput,
PriceLabel,
PriceValue,
ProductSwiper,
CheckboxLabel
} from "./styles";
import { SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel, Scrollbar } from "swiper/core";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Mousewheel, Pagination, Scrollbar]);

// Оформление заказа
function Order({
products // список продуктов
}) {
const [swiperRef, setSwiperRef] = useState(null);
const [selectProductIds, setSelectProductIds] = useState([]);
//id в продукты
const selectProducts = selectProductIds.map((id) =>
products.find((product) => product.id === id)
);
//цена покупки
const fullPrice = selectProducts.reduce(
(sum, product) => (sum += product.price),
0
);
const handleOnClickProduct = (value, index) => {
if (!selectProductIds.includes(value)) {
swiperRef.slideTo(index, 0);
}
};
return (
<StyledOrder as="form">
<LeftColumn>
<Panel marginBottom={20} paddingTop={24} paddingBottom={10}>

<Title as="h2" size={TitleSize.EXTRA_SMALL} marginBottom={12}>
Выберите продукты
</Title>
<CheckboxList
labelComponent={CheckboxLabel}
name={"select-products"}
isGridList={false}
options={products.map((product) => ({
value: product.id,
title: product.name
}))}
selectValues={selectProductIds}
onChange={setSelectProductIds}
onClickLabel={handleOnClickProduct}
/>
</Panel>
<Panel>
<Title size={TitleSize.EXTRA_SMALL} marginBottom={24}>
Сделать заказ
</Title>
<AddressInput placeholder="Введите адрес доставки" />
<PriceLabel as="span">Цена</PriceLabel>
<PriceValue value={fullPrice} />
<Button maxWidth>Купить</Button>
</Panel>
</LeftColumn>
<ProductSwiper
onSwiper={setSwiperRef}
spaceBetween={12}
direction="vertical"
slidesPerView="auto"
scrollbar={{ draggable: true }}
mousewheel
pagination={{
          type: "fanction"
        }} >
{products.map((product) => (
<SwiperSlide key={product.id}>
<ProductCart product={product} />
</SwiperSlide>
))}
</ProductSwiper>
</StyledOrder>
);
}

export default Order;

получим
https://codesandbox.io/s/5-17-8-forked-s5mpcw?file=/src/components/ui/price/price.jsx

Шаг 9. Обработка события покупки
Сохраним значение введённого адреса в state.

Для этого заведём:
const [address, setAddress] = useState("");

И добавим их в props AddressInput, сделав его управляемым элементом:

<AddressInput
value={address}
onChange={(e) => setAddress(e.target.value)}
placeholder="Введите адрес доставки"
/>

Теперь добавим обработчик на кнопку «Купить» в оформлении заказа, который будет выводить через alert информацию о заказе:

const handleBuyClick = () => {
// eslint-disable-next-line no-alert
alert(`Спасибо за заказ, вы купили:\n${selectProducts.map( (product) =>`${product.name} - ${product.price} руб.\n`)} Итого: ${fullPrice} руб. Доставка по адресу: ${address}.`);
};

В результате код оформления заказа примет вот такой вид.
https://codesandbox.io/s/5-17-9-forked-w4rvsp?file=/src/components/pages/order/order.jsx

Шаг 10. Обработка крайних случаев
Добавим дополнительные проверки.

Прежде всего, сама форма должна отображаться только в том случае, если продукты есть в наличии. Если их нет, на месте формы нужно выводить «Продукты были слишком вкусные и их разобрали»:

products && products.length ? (JSX оформления заказа) : "Продукты были слишком вкусные и их разобрали."

Также кнопку «Купить» нужно делать неактивной для тех случаев, когда-либо не выбраны продукты, либо не введён адрес доставки:

    !(selectProductIds.length && address)

В результате Order примет такой вид:
import React, { useState } from "react";
import Panel from "/src/components/ui/panel/panel";
import Title, { TitleSize } from "/src/components/ui/title/title";
import ProductCart from "/src/components/ui/product-cart/product-cart";
import Button from "/src/components/ui/button/button";
import CheckboxList from "/src/components/ui/checkbox-list/checkbox-list";

import {
LeftColumn,
StyledOrder,
AddressInput,
PriceLabel,
PriceValue,
ProductSwiper,
CheckboxLabel
} from "./styles";
import { SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Mousewheel, Scrollbar } from "swiper/core";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Mousewheel, Pagination, Scrollbar]);

// Оформление заказа
function Order({
products // список продуктов
}) {
const [swiperRef, setSwiperRef] = useState(null);
const [selectProductIds, setSelectProductIds] = useState([]);
//id в продукты
const selectProducts = selectProductIds.map((id) =>
products.find((product) => product.id === id)
);
//цена покупки
const fullPrice = selectProducts.reduce(
(sum, product) => (sum += product.price),
0
);
const handleOnClickProduct = (value, index) => {
if (!selectProductIds.includes(value)) {
swiperRef.slideTo(index, 0);
}
};
const [address, setAddress] = useState("");
const handleBuyClick = () => {
// eslint-disable-next-line no-alert
alert(`Спасибо за заказ, вы купили:\n${selectProducts.map( (product) =>`${product.name} - ${product.price} руб.\n`)} Итого: ${fullPrice} руб. Доставка по адресу: ${address}.`);
};
return products && products.length ? (
<StyledOrder as="form">
<LeftColumn>
<Panel marginBottom={20} paddingTop={24} paddingBottom={10}>

<Title as="h2" size={TitleSize.EXTRA_SMALL} marginBottom={12}>
Выберите продукты
</Title>
<CheckboxList
labelComponent={CheckboxLabel}
name={"select-products"}
isGridList={false}
options={products.map((product) => ({
value: product.id,
title: product.name
}))}
selectValues={selectProductIds}
onChange={setSelectProductIds}
onClickLabel={handleOnClickProduct}
/>
</Panel>
<Panel>
<Title size={TitleSize.EXTRA_SMALL} marginBottom={24}>
Сделать заказ
</Title>
<AddressInput
value={address}
onChange={(e) => setAddress(e.target.value)}
placeholder="Введите адрес доставки"
/>
<PriceLabel as="span">Цена</PriceLabel>
<PriceValue value={fullPrice} />
<Button
maxWidth
onClick={handleBuyClick}
disabled={!(selectProductIds.length && address)} >
Купить
</Button>
</Panel>
</LeftColumn>
<ProductSwiper
onSwiper={setSwiperRef}
spaceBetween={12}
direction="vertical"
slidesPerView="auto"
scrollbar={{ draggable: true }}
mousewheel
pagination={{
          type: "fanction"
        }} >
{products.map((product) => (
<SwiperSlide key={product.id}>
<ProductCart product={product} />
</SwiperSlide>
))}
</ProductSwiper>
</StyledOrder>
) : (
"Продукты были слишком вкусные и их разобрали."
);
}

export default Order;

получим
https://codesandbox.io/s/5-17-9-forked-73n1c?file=/src/components/pages/order/order.jsx
