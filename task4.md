По аналогии с примером «Котокафе» из предыдущей статьи реализуйте роутинг для проекта «Фермерские продукты».

Подключите к проекту пакет react-router-dom.
Реализуйте роутинг.
Отредактируйте отображение навигации таким образом, чтобы в зависимости от открытой страницы отображались нужные ссылки, как в макетах.
Расставьте ссылки, используя компонент Link из react-router-dom.
После самостоятельного выполнения задания можно открыть решение из учебника и сравнить получившиеся результаты.

Шаг 1. Задача
По аналогии с примером «Котокафе» из предыдущей статьи реализуйте роутинг для проекта «Фермерские продукты».

Обе страницы сайта готовы, осталось объединить их в один ресурс, используя роутинг.

Шаг 2. Список URL
Помнить и вручную писать URL страниц сайта достаточно сложно: можно допустить ошибку или что-то забыть. Поэтому заведём константу AppRoute, которая будет хранить роуты сайта.

Для этого создадим файл const.js в директории src:
export const AppRoute = {
MAIN: '/',
ORDER: '/order',
};

Шаг 3. Настройка роутинга
Подключим React-router-dom и настроим роутинг в App:
import React from "react";
import PageWrapper from "/src/components/layout/page-wrapper/page-wrapper";
import features from "/src/mocks/features";
import products from "/src/mocks/products";
import { GlobalStyle } from "./styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoute } from "/src/const";

// Корневой компонент всего приложения
function App() {
return (
<>
<GlobalStyle />
<Router>
<Routes>
<Route exact path={AppRoute.MAIN}>
<Route
index
element={<PageWrapper features={features} products={products} />}
/>
<Route
exact
path={AppRoute.ORDER}
element={<PageWrapper features={features} products={products} />}
/>
</Route>
</Routes>
</Router>
</>
);
}

export default App;

получим https://codesandbox.io/s/6-4-2-v2-forked-cl8flh?file=/src/components/app/app.jsx

Шаг 4. Рефакторинг страниц
Роутинг работает, но пока на всех страницах выводится форма покупки. Так происходит, потому что в разметке PageWrapper жёстко забита страница покупки.

Поменяем PageWrapper так, чтобы он стал общим шаблонам для всех страниц и получал отображаемую страницу через Outlet. А затем добавим его в App.

В результате PageWrapper примет вид:
import React from "react";
import Header from "/src/components/layout/header/header";
import Footer from "/src/components/layout/footer/footer";
import { Outlet } from "react-router-dom";
import { Main } from "./styles";

// Обёртка для контента страниц
function PageWrapper({ products }) {
return (
<>

<Header />
<Main>
<Outlet />
</Main>
<Footer />
</>
);
}

export default PageWrapper;

В App появятся компоненты страниц, разные для каждого роута:
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "/src/components/pages/main-page/main-page";
import PageWrapper from "/src/components/layout/page-wrapper/page-wrapper";
import Order from "/src/components/pages/order/order";
import { AppRoute } from "/src/const";
import features from "/src/mocks/features";
import products from "/src/mocks/products";
import { GlobalStyle } from "./styles";

// Корневой компонент всего приложения
function App() {
return (
<>
<GlobalStyle />
<Router>
<Routes>
<Route path={AppRoute.MAIN} element={<PageWrapper />}>
<Route index element={<MainPage features={features} />} />
<Route
path={AppRoute.ORDER.replace(AppRoute.MAIN, "")}
element={<Order products={products} />}
/>
</Route>
</Routes>
</Router>
</>
);
}

export default App;

получим
https://codesandbox.io/s/6-4-3-v2-forked-mcv4w4?file=/src/components/app/app.jsx

Шаг 5. Замена ссылок на Link
Теперь заменим обычные ссылки на Link. Мы использовали ссылки в приложении только через компоненты Button и Logo. Начнём с компонента Button.

Заменим тег <a> на Link и атрибут href на props to. Получим:

import React, { forwardRef } from "react";
import { StyledButton } from "./styles";

const Button = forwardRef(
({ children, minWidth, link, className, onClick, ...props }, ref) => {
return (
<StyledButton
{...props}
\$minWidth={minWidth}
ref={ref}
{...(link ? { to: link } : { as: "button", onClick, type: "button" })}
className={className} >
{children}
</StyledButton>
);
}
);

export default Button;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledButton = styled(Link)`display: block; min-height: 60px; font-size: ${(props) => props.theme.fontSizeDefault}; min-width: ${(props) =>`${props.$minWidth}px` || "100%"};
max-width: 700px;
font-weight: 700;
line-height: 58px;
color: ${(props) => props.theme.colorWhite};
  background-color: ${(props) => props.theme.colorForButton};
text-align: center;
border-radius: 5px;
text-decoration: none;
border: none;
background-image: none;
box-shadow: none;
cursor: pointer;
transition: background-color 0.2s ease-out, box-shadow 0.2s ease-out;

&:hover,
&:active {
background-color: \${(props) => props.theme.colorForButtonHover};
box-shadow: inset 0 4px 0 rgba(0, 0, 0, 0.14);
}

&:active {
box-shadow: none;
}
`;

Также в других компонентах заменим прямое написание ссылок на значения из AppRoute.

Теперь роутинг работает корректно для кнопок.

То же самое выполним для компонента Logo. Заменим тег <a> на компонент Link:

import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledLogo = styled(Link)`
display: flex;
margin-left: -4px;
height: 44px;
align-items: center;
text-decoration: none;
color: \${(props) => props.theme.fontColorBlack};

&:hover,
&:active,
&:visited {
text-decoration: none;
color: \${(props) => props.theme.fontColorBlack};
}
`;

export const Text = styled.span`display: flex; min-height: 44px; margin-left: 25px; font-weight: bold; font-size: 28px; line-height: 44px; color: ${(props) => props.theme.colorBlackForText};`;

Также заменим атрибут href на to:

import React from "react";
import { ReactComponent } from "/src/assets/logo.svg";
import { Text, StyledLogo } from "./styles";

// Логотип сайта с названием
function Logo() {
return (
<StyledLogo to="/">
<ReactComponent />
<Text>Фермерские продукты</Text>
</StyledLogo>
);
}

export default Logo;

Так как адрес ссылки зашит внутри компонента Logo, нужно просто поменять / на константу из AppRoute:

import React from "react";
import { ReactComponent } from "/src/assets/logo.svg";
import { Text, StyledLogo } from "./styles";
import { AppRoute } from "/src/const";

// Логотип сайта с названием
function Logo() {
return (
<StyledLogo to={AppRoute.MAIN}>
<ReactComponent />
<Text>Фермерские продукты</Text>
</StyledLogo>
);
}

export default Logo;

Теперь роутинг работает корректно для логотипа.

У логотипа есть одна особенность: он должен быть некликабельным, когда мы находимся на главной странице. Всё просто — уже на странице, на которую он ведёт. Таким образом, на всех страницах, кроме главной, логотип должен быть ссылкой, как сейчас. А на главной его можно отображать, например, через span.

Сейчас на сайте логотип всегда отображается ссылкой через компонент Link. Чтобы это исправить, сначала добавим стилизованный компонент StyledLogoMainPage. Он будет стилизовать span, добавляя стили логотипа.

Часть стилей StyledLogo и StyledLogoMainPage будут совпадать. Вынесем их в отдельный кусочек CSS, записанный в переменную logoStyle, при помощи инструмента css из styled-components.

В результате получим:
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

    const logoStyle = css`
      display: flex;
      margin-left: -4px;
      height: 44px;
      align-items: center;
      color: ${(props) => props.theme.fontColorBlack};
    `;

    export const StyledLogo = styled(Link)`
      ${logoStyle}
      text-decoration: none;

      &:hover,
      &:active,
      &:visited {
        text-decoration: none;
        color: ${(props) => props.theme.fontColorBlack};
      }
    `;

    export const StyledLogoMainPage = styled.span`
      ${logoStyle}
    `;

Теперь в самом компоненте Logo воспользуемся хуком useLocation из пакета react-router-dom. Этот хук позволяет определить URL-адрес, по которому отрисовалась страница с компонентом.

Воспользуемся конструкцией:
const { pathname } = useLocation();

Здесь значение, возращённое useLocation, будет деструктуризировано. Значение pathname из URL будет записано в константу pathname. Далее на основе полученного pathname добавим проверку: при нахождении на главной странице будем отрисовывать компонент StyledLogoMainPage, в противном случае — StyledLogo:

return pathname === AppRoute.MAIN ? (
<StyledLogoMainPage>
<ReactComponent />
<Text>Фермерские продукты</Text>
</StyledLogoMainPage>
): (
<StyledLogo to={AppRoute.MAIN}>
<ReactComponent />
<Text>Фермерские продукты</Text>
</StyledLogo>
);

В итоге получится такой код.
https://codesandbox.io/s/6-4-4-1v2-rdczpt?file=/src/components/ui/logo/logo.jsx

Шаг 6. Замена кнопки в шапке
Сейчас в шапке всегда отображается кнопка «Купить билет», которая ведёт на страницу покупки билета. Но она не должна отображаться на странице покупки — вместо неё там должна быть ссылка для перехода к главной странице. Очевидно, что в навигации не должна отображаться ссылка на страницу, на которой находится пользователь. Поэтому переделаем навигацию.

Создадим стилизацию кнопки, которую нужно вывести для перехода на главную страницу — StyledButton. Теперь создадим список кнопок навигации, каждая из которых будет характеризоваться объектом со свойством to — в нём будет храниться путь, куда должно вести нажатие на ссылку, и свойством button — в нём будет храниться JSX для кнопки.

const buttons = [
{
to: AppRoute.MAIN,
button: (
<StyledButton minWidth={260} key={AppRoute.MAIN} link={AppRoute.MAIN}>
Главная
</StyledButton>
)
},
{
to: AppRoute.BUY,
button: (
<Button minWidth={260} key={AppRoute.BUY} link={AppRoute.BUY}>
Купить билет
</Button>
)
}
];

В компоненте Nav начнём принимать pageUrl, полученный через useLocation (), в котором будет URL текущей страницы. Теперь для отображения навигации нужно отфильтровать buttons, удалив из него элемент, ссылка которого соответствует pageUrl. А оставшиеся элементы нужно вывести на экран, используя свойство button:

import React from "react";
import Button from "/src/components/ui/button/button";
import { Ul, Li } from "/src/components/styled";
import { AppRoute } from "/src/const";
import { StyledButton } from "./styles";
import { useLocation } from "react-router-dom";

const links = [
{
to: AppRoute.MAIN,
item: <StyledButton link={AppRoute.MAIN}>Главная</StyledButton>
},
{ to: AppRoute.ORDER, item: <Button link={AppRoute.ORDER}>Купить</Button> }
];

// навигация
function Nav() {
const pageUrl = useLocation().pathname;

return (

<nav>
<Ul>
{links
.filter((link) => link.to !== pageUrl)
.map((link) => (
<Li key={link.to}>{link.item}</Li>
))}
</Ul>
</nav>
);
}

export default Nav;

Получится — Nav.
https://codesandbox.io/s/6-4-5-v2-forked-zvx8sy?file=/src/components/layout/nav/nav.jsx

Шаг 7. Чиним scroll
Сейчас при переходе от страницы к странице не обнуляется scroll. Для решения этой проблемы создадим компонент ScrollTop в директории ui:

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);

return null;
}

И подключим его в App:

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "/src/components/pages/main-page/main-page";
import PageWrapper from "/src/components/layout/page-wrapper/page-wrapper";
import Order from "/src/components/pages/order/order";
import { AppRoute } from "/src/const";
import features from "/src/mocks/features";
import products from "/src/mocks/products";
import ScrollTop from "/src/components/ui/scroll-top/scroll-top";
import { GlobalStyle } from "./styles";

// Корневой компонент всего приложения
function App() {
return (
<>
<GlobalStyle />
<Router>
<ScrollTop />
<Routes>
<Route path={AppRoute.MAIN} element={<PageWrapper />}>
<Route index element={<MainPage features={features} />} />
<Route
path={AppRoute.ORDER.replace(AppRoute.MAIN, "")}
element={<Order products={products} />}
/>
</Route>
</Routes>
</Router>
</>
);
}

export default App;

Сайт проекта «Фермерские продукты» готов.
https://codesandbox.io/s/6-4-6-v2-forked-l3ghsh?file=/src/components/app/app.jsx
