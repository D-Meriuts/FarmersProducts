=================================
По аналогии с примером «Котокафе» из предыдущей статьи стилизуйте главную страницу проекта «Фермерские продукты», используя styled-components.

Подключите библиотеку styled-components к проекту.
При необходимости создайте и подключите тему, содержащую глобальные для всего проекта значения стилей.
Переведите глобальные CSS-стили на styled-components, если они есть.
Для каждого компонента создайте файл JS со стилями и опишите их через styled-components. Удалите CSS-файл.

Шаг 1. Задача
По аналогии с примером «Котокафе» удалите CSS-файлы из проекта «Фермерских продуктов» и стилизуйте главную страницу, используя Styled components.

Шаг 2. Установка Styled components
Добавим Styled components в зависимости.

Шаг 3. Опишем тему приложения и глобальные стили
Сразу создадим тему приложения. Для этого добавим директорию theme и в ней создадим файл default.js с темой, а затем вынесем в тему повторяющиеся величины:
export const defaultTheme = {
fontColorBlack: "#333333",
colorWhite: "#ffffff",
backgroundColorGray: "#f7f7f7",
backgroundColorBlue: "#d8ecfe",
panelBackgroundColor: "#88aa4d",
panelBackgroundColorDanger: "#f75531",
buttonColor: "#fc9b27",
buttonColorHoverActive: "#fc7427",
pagePadding: "90px",
indent: "20px",
fontFamily: '"Inter", "Arial", sans-serif',
fontSizeDefault: "18px",
lineHeightDefault: 1.5,
pageWidth: "1280px",
headerHeight: "80px",
footerHeight: "80px"
};

Теперь в index.js с помощью ThemeProvider обернём App в созданную тему:
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "/src/components/app/app";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./thems/default";

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(
<StrictMode>
<ThemeProvider theme={defaultTheme}>
<App />
</ThemeProvider>
</StrictMode>
);
В самом App мы используем style.css, чтобы задать стили <html> и <body>. Заменим его на файл styles.js, в котором с помощью createGlobalStyle создадим стилизованный компонент с глобальными стилями приложения:
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
height: 100%;
}

body,
html {
margin: 0;
}

body {
position: relative;
min-height: 100%;
font-family: ${(props) => props.theme.fontFamily};
    font-size: ${(props) => props.theme.fontSizeDefault};
line-height: 27px;
font-weight: 400;
color: \${(props) => props.theme.colorBlackForText};
}
`;
Вставим компонент глобальных стилей в JSX у App:

import React from "react";
import PageWrapper from "/src/components/layout/page-wrapper/page-wrapper";
import features from "/src/mocks/features";
import { GlobalStyle } from "./styles";

export default function App() {
return (
<>
<GlobalStyle />
<PageWrapper features={features}>Контент страницы</PageWrapper>
</>
);
}
При этом мы не указали подключение шрифтов в createGlobalStyle. Дело в том, что styled-components плохо работают с @import. Поэтому рекомендуются вместо подключения шрифтов в стилях через import, подключать их в HTML через тег link. Т.е. вместо подключения шрифта @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"); через стили, нужно подключить его в разметке страницы внутри тега head, указав:

  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">

Тег head и остальные, общие для всех страниц элементы находятся в шаблоне страницы в файле public/index.html. В дальнейшем мы более подробно изучим public/index.html, а сейчас просто вставим код с подключением шрифта в разметку:

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>

  </head>

  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->

  </body>
</html>

Теперь на всех страницах будет:

  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">

И везде будет доступен шрифт Inter.

В результате получится
https://codesandbox.io/s/4-55-3-forked-3fcpl6?file=/src/components/app/app.jsx.

Шаг 4. Стилизация элементов
Создадим директорию styled. Добавим в неё компоненты, стилизующие теги, чтобы не убирать дефолтные стили для тегов и не перебивать их при каждом использовании. Создадим в директории стилизованные компоненты под теги <section>, <ul> и <li>. В дальнейшем вместо дефолтных тегов будем использовать созданные стилизованные компоненты. Например, нам нужно будет <ul> для отображения карточек товара. Поэтому для него можно создать стилизованный компонент:

import styled, { css } from "styled-components";

const gridList = css`margin-left: ${(props) => props.$indent ?`-${props.$indent}px`:`-\${props.theme.indent}`}; margin-top: ${(props) => props.$indent ?`-${props.$indent}px`:`-${props.theme.indent}`};
  font-size: 0;
  line-height: 0;
  text-align: ${(props) => props.\$align || "center"};

li {
display: inline-block;
margin-left: ${(props) =>
      props.$indent ? `${props.$indent}px` : props.theme.indent};
margin-top: ${(props) =>
      props.$indent ? `${props.$indent}px` : props.theme.indent};
font-size: ${(props) =>
      props.$fontSize ? `${props.$fontSize}px` : props.theme.fontSizeDefault};
line-height: ${(props) =>
      props.$lineHeight ? `${props.$lineHeight}px` : "27px"};
vertical-align: top;
}
`;

const Ul = styled.ul`margin: 0; padding: 0; ${(props) => (props.$isGridList ? gridList : "")}`;

export default Ul;

Для большей лёгкости в подключении компонентов добавим в директорию styled файл index.js, который можно будет использовать при импорте:

export { default as P } from "./p/p";
export { default as Section } from "./section/section";
export { default as Li } from "./li/li";
export { default as Ul } from "./ul/ul";
export { default as Img } from "./img/img";

Шаг 5. Рефакторинг Button
Улучшим компонент Button. Сделаем так, чтобы при передаче props Link он отрендерился в ссылку, а в остальных случаях — в кнопку. Также добавим возможность менять ширину кнопки. Для этого воспользуемся возможностями styled-components. Получится:

import React from "react";
import { StyledButton } from "./styles";

function Button({
children, // дочерний элемент, отображаемый в кнопке
link, // ссылка
maxWidth, // делает кнопку на 100% родителя
className, // класс
onClick, // событие по клику
...props // остальные переданные пропсы
}) {
return (
<StyledButton
{...props}
\$maxWidth={maxWidth}
{...(link ? { to: link } : { as: "button", onClick, type: "button" })}
className={className} >
{children}
</StyledButton>
);
}

export default Button;

И StyledButton:
import styled from "styled-components";

export const StyledButton = styled.a`
display: block;
min-height: 60px;
padding: 0 24px;
min-width: ${(props) => (props.$maxWidth ? "100%" : "260px")};
max-width: 700px;
font-size: ${(props) => props.theme.fontSizeDefault};
  font-weight: bold;
  line-height: 58px;
  text-align: center;
  text-decoration: none;
  color: ${(props) => props.theme.colorWhite};
background-color: ${(props) => props.theme.buttonColor};
  border: none;
  background-image: none;
  box-shadow: none;
  cursor: pointer;
  transition: background-color 0.2s ease-out, box-shadow 0.2s ease-out;
  box-sizing: border-box;
  font-family: ${(props) => props.theme.fontFamily};

&:hover,
&:active {
background-color: \${(props) => props.theme.buttonColorHoverActive};
box-shadow: inset 0 4px 0 rgba(0, 0, 0, 0.14);
}

&:active {
box-shadow: none;
}

&:disabled {
opacity: 0.5;
box-shadow: none;
background-color: \${(props) => props.theme.buttonColor};
}
`;

Теперь во всех местах использования Button можно использовать props minWidth и Link, если кнопка должна работать как ссылка. Обратите внимание, на главной странице все кнопки являются ссылками и ведут на страницу /buy, которой пока нет.
https://codesandbox.io/s/4-55-4-forked-j4d4jk?file=/src/components/ui/button/styles.js

Шаг 6. Рефакторинг Title
Переделаем компонент Title. В результате получится:
import styled, { css } from "styled-components";

export const TitleSize = {
BIG: "big",
MEDIUM: "medium",
SMALL: "small",
EXTRA_SMALL: "extra_small"
};

const TitleSizeValue = {
[TitleSize.BIG]: {
fontSize: "44px",
lineHeight: "50px"
},
[TitleSize.MEDIUM]: {
fontSize: "36px",
lineHeight: "41px"
},
[TitleSize.SMALL]: {
fontSize: "24px",
lineHeight: "31px"
},
[TitleSize.EXTRA_SMALL]: {
fontSize: "18px",
lineHeight: "27px"
}
};

// Заголовок
export const Title = styled.h1`margin: 0; padding: 0; margin-bottom: ${(props) => props.marginBottom || 0}px; font-weight: bold; ${(props) => { const values = TitleSizeValue[props.size || TitleSize.MEDIUM]; return css`
font-size: ${values.fontSize};
      line-height: ${values.lineHeight};
`; }};`;

export default Title;

Теперь Title — стилизованный компонент, можно менять уровень заголовка с <h1> на <h2> или любой другой с помощью props as. Расставим уровни заголовков. Title в about — это <h1>, Title в FeaturesList — это <h2>, а в карточках товаров Title — это <h3>.

Теперь все заголовки имеют правильный уровень.
https://codesandbox.io/s/4-55-5-forked-9kstzn?file=/src/components/ui/title/title.js

Шаг 7. Рефакторинг About
Переделаем блок About на styled-components. Заменим у About stytle.css на styles.js. В styles.js вместо CSS-классов для каждого элемента создадим стилизованный компонент:
import styled from "styled-components";
import { P, Section } from "/src/components/styled";
import aboutImage from "/src/assets/about.svg";

export const StyledAbout = styled(Section)`
position: relative;
min-height: 550px;
padding-top: 183px;
padding-bottom: 145px;
padding-right: 553px;
background-color: \${(props) => props.theme.backgroundColorBlue};
align-items: center;
z-index: 1;
flex-direction: column;

&::after {
position: absolute;
bottom: 0;
right: ${(props) => props.theme.pagePadding};
    display: block;
    content: "";
    width: 446px;
    height: 563px;
    margin: auto;
    background-image: url(${aboutImage});
}
`;

export const Text = styled(P)`box-sizing: border-box; max-width: 650px; margin-top: 24px; padding-right: 116px; margin-bottom: 40px;`;

Вместо base64 можно использовать полноценные картинки из assets, так как CodeSandbox корректно разрешает пути до картинок в JavaScript-файлах.

Теперь на основе созданных компонентов получим новую разметку для компонента About:

import React from "react";
import Title, { TitleSize } from "/src/components/ui/title/title";
import { Text, StyledAbout } from "./styles";

// Раздел о магазине фермерских продуктов
function About() {
return (
<StyledAbout>

<Title size={TitleSize.BIG}>
{" "}
Магазин фермерских продуктов с доставкой
</Title>
<Text>
Все продукты изготавливаются под заказ. Фермеры начинают готовить
продукты за день до отправки заказа клиентам. Именно поэтому мы
принимаем заказы заранее и доставляем продукты максимально свежими.
</Text>
</StyledAbout>
);
}

export default About;

Отображение About не изменилось, но теперь он стилизуется через styled-components.
https://codesandbox.io/s/4-55-6-forked-chcyz9?file=/src/components/blocks/about/about.jsx

Шаг 8. Logo, через SVGR
При стилизации компонента Logo можно через SVGR создать из SVG React-компонентов, а затем вставить его в JSX. В CodeSandbox для этого SVG нужно импортировать не по умолчанию import logo from "/src/assets/logo.svg";, а использовать именованный импорт import { ReactComponent } from "/src/assets/logo.svg;. Теперь в ReactComponent будет находиться именно компонент, созданный на основе logo.svg, а не путь до logo.svg, как в случае с импортом по умолчанию.

В результате Logo примет вид:
import React from "react";
import { ReactComponent } from "/src/assets/logo.svg";
import { Text, StyledLogo } from "./styles";

// Логотип сайта с названием
function Logo() {
return (
<StyledLogo href="/">
<ReactComponent />
<Text>Фермерские продукты</Text>
</StyledLogo>
);
}

export default Logo;

А стилизованные компоненты для него описаны в styles.js:

import styled from "styled-components";

export const StyledLogo = styled.a`
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

Логотип переведён на styled components.
https://codesandbox.io/s/4-55-7-forked-vgjd79?file=/src/components/ui/logo/logo.jsx

Шаг 9. Стилизация остальных компонентов
По аналогии с предыдущими шагами переведём на styled-components все остальные компоненты главной страницы:
features-list
footer
page-wrapper
feature-card
и др где были style.css
. Готово. Внешний вид страницы не изменился, но благодаря styled-components компоненты стало легче стилизовать.
https://codesandbox.io/s/4-55-8-forked-fy4mm9
