Макеты проекта «Фермерские продукты».
https://www.figma.com/file/CXOyZGW7suelJAT8uO0Lxg/%F0%9F%A7%91_%F0%9F%8C%BE%D0%A4%D0%B5%D1%80%D0%BC%D0%B5%D1%80%D1%81%D0%BA%D0%B8%D0%B9-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD?type=design&mode=design
Декомпозируйте макет главной страницы на компоненты.
Подготовьте моковые данные.
Реализуйте компоненты и прокиньте в них моковые данные.
Компоненты можно стилизовать через обычный CSS. Необязательно делать это очень тщательно, в дальнейшем для стилизации мы будем использовать другой инструмент.
Шаг 1. Задача
По аналогии с примером «Котокафе» из предыдущей демонстрации реализуйте главную страницу проекта «Фермерские продукты». Создайте под него отдельный проект в CodeSanbox.

Шаг 2. Структура
Создадим главную страницу для сайта «Фермерские продукты».

Создадим три директории. В components будем хранить различные компоненты проекта. В mocks добавим файлы с моковыми данными, необходимыми для отрисовки интерфейса. В assets будем хранить картинки и другие ресурсы для интерфейса.

Компонентов будет много, поэтому внутри components создадим директории ui, pages, layout, blocks и app.

ui будет хранить небольшие переиспользуемые компоненты: кнопки, заголовки, списки, карточки товара и другие;
pages будет содержать компоненты — страницы приложения (главная, купить билет);
layout включает компоненты, отвечающие за отображение обёртки для контента страниц: шапка, подвал и другие;
blocks будет хранить большие компоненты страниц: они могут не переиспользоваться, но их всё равно полезно выделить в отдельные компоненты, чтобы структурировать проект;
app — это компонент приложения, своего рода точка входа в другие компоненты. Может возникнуть вопрос, зачем нам нужен App, когда всё можно поместить в index.js. Но с развитием приложения мы поймём, что внутри app есть своя логика, которую удобно хранить в отдельном компоненте.
Получится проект. https://codesandbox.io/s/3-5-1-forked-49ri5w

Шаг 3. Декомпозиция на компоненты
Рассмотрим макет главной страницы и выделим основные компоненты:
Эту страницу можно представить в виде иерархии следующих компонентов:

<PageWrpapeer> // Общая обёртка для всех страниц на сайте часть layout

  <Header> // Шапка сайта, часть layout
    <Logo /> // Логотип сайта, положим в директорию ui, так как может переиспользоваться на сайте
    <Nav> // Навигация сайта, часть layout
      <Button /> // Кнопка для сайта, положим в директорию ui, так как может переиспользоваться на сайте
    </Nav>
  </Header>
  <MainPage> // Компонент с контентом главной страницы, положим в директорию pages
    <About> // Компонент раздела о «Фермерских продуктах», положим в blocks, так как это часть структуры
      <Title /> // Компонент заголовок, положим в директорию ui так как может переиспользоваться на сайте
    </About>
    <FeaturesList> // Компонент раздела преимущества, положим в blocks так как это часть структуры
      <Title /> // Компонент-заголовок, положим в директорию ui, так как может переиспользоваться на сайте
      <FeatureCard1 /> // Компонент карточки преимущества, положим в директорию ui, так как может переиспользоваться на сайте
      <FeatureCard2 />
      ...
      <FeatureCardN />
      <Button /> // Кнопка для сайта, положим в директорию ui, так как может переиспользоваться на сайте
    </FeaturesList>
  </MainPage>
  <Footer> // Подвал сайта, часть layout
    <Logo /> // Логотип сайта, положим в директорию ui, так как может переиспользоваться на сайте
  </Footer>
</PageWrpapeer>

Создадим в проекте пустые заглушки для этих компонентов.
https://codesandbox.io/s/3-5-2-forked-7fdqxj

Шаг 4. Вёрстка layout
Сверстаем layout и подключим его в App. Первым делом создадим в '/src/components/app' файл style.css и подключим его в App. Внутри style.css зададим стили для <body> и <html>:

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");

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
font-family: "Inter", "Arial", sans-serif;
font-size: 18px;
line-height: 27px;
font-weight: 400;
color: #333333;
}

Теперь сверстаем компоненты из директории layout. Пока не будем думать о динамических элементах или данных, просто добавим в компоненты layout статичную разметку и CSS-файлы со стилями. Например, PageWrapper — это общая обёртка страницы, он должен содержать шапку, подвал и саму страницу — в нашем случае главную страницу. Поэтому он будет выглядеть так:

import React from "react";
import Header from "/src/components/layout/header/header";
import Footer from "/src/components/layout/footer/footer";
import MainPage from "/src/components/pages/main-page/main-page";
import "./style.css";

// Обёртка для контента страниц
function PageWrapper() {
return (
<>

<Header />
<main className="page-wrapper__main">
<MainPage />
</main>
<Footer />
</>
);
}

export default PageWrapper;

В файле style.css можно указать стили для CSS-класса page-wrapper\_\_main:

.page-wrapper\_\_main {
width: 1280px;
margin: 0 auto;
padding-bottom: 80px;
}

Чтобы имена классов не пересекались, мы начинаем их имя с названия компонента, в данном случае page-wrapper. Затем через \_\_ указываем элемент внутри компонента, для которого создан класс.

Далее так же реализуем компонент Header:

import React from "react";
import Logo from "/src/components/ui/logo/logo";
import Nav from "/src/components/layout/nav/nav";
import "./style.css";

function Header() {
return (

<header className="header">
<Logo />
<Nav />
</header>
);
}

export default Header;

А также стили для него:
.header {
display: flex;
padding-left: 90px;
padding-right: 90px;
width: 1280px;
margin: 0 auto;
position: relative;
height: 80px;
padding-top: 0;
padding-bottom: 0;
justify-content: space-between;
background-color: #ffffff;
box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04), 0 2px 6px rgba(0, 0, 0, 0.04),
0 0 1px rgba(0, 0, 0, 0.04);
align-items: center;
z-index: 5;
box-sizing: border-box;
}

По аналогии можно создать и написать стили для всех компонентов директории layout, а также использующихся в layout компонентов Button и Logo. В результате
https://codesandbox.io/s/3-5-3-forked-z1debw?file=/src/components/app/app.jsx

, если подключить PageWrapper в App, то будет выведена страница с шапкой и подвалом, но пока без контента.

Шаг 5. Вёрстка блока About

Начнём создавать контент страницы с блока About. Сначала вставим пока пустой компонент About в разметку MainPage:

import React from "react";
import About from "/src/components/blocks/about/about";

function MainPage() {
return (
<>
<About />
</>
);
}

export default MainPage;

Теперь создадим разметку для самого about:

import React from "react";
import Title, { TitleSize } from "/src/components/ui/title/title";
import "./style.css";

function About() {
return (

<section className="about">
<Title size={TitleSize.BIG}>
Магазин фермерских продуктов с доставкой
</Title>
<p>
Все продукты изготавливаются под заказ. Фермеры начинают готовить
продукты за день до отправки заказа клиентам. Именно поэтому мы
принимаем заказы заранее и доставляем продукты максимально свежими.
</p>
</section>
);
}

export default About;

И добавим стили в файле style.css. К сожалению, React-шаблон для CodeSandbox не позволяет указывать в CSS-файлах пути до картинок в assets, поэтому все картинки в стилях будем указывать инлайн в кодировке base64.

Чтобы About корректно отображался, нужно реализовать компонент Title. Его разметка может выглядеть так:

import React from "react";
import "./style.css";

export const TitleSize = {
BIG: "big",
MEDIUM: "medium",
SMALL: "small",
EXTRA_SMALL: "extra_small"
};

function Title({ children, size }) {
return <h1 className={`title${size ?` title\_\${size}`: ""}`}>{children}</h1>;
}

export default Title;

Заголовок обрабатывает children, чтобы в нём можно было указывать текст для вывода. Также есть props size. Дело в том, что в макете четыре разных заголовка, которые отличаются размерами. И создавать для них четыре разных компонента не так удобно, как один общий Title с возможностью менять размеры через props.

В стилях компонента перечислены классы для разных размеров заголовка:

.title {
margin: 0;
padding: 0;
font-weight: 700;
font-size: 36px;
line-height: 41px;
}

.title_small {
line-height: 31px;
font-size: 24px;
}

.title_big {
line-height: 50px;
font-size: 44px;
}

.title_extra_small {
font-size: 18px;
line-height: 27px;
}

Блок About
https://codesandbox.io/s/3-5-4-forked-c357dy
появился на странице.
