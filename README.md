# интернет-магазин Web-ларёк

## Стек
<a href="https://www.w3.org/TR/2011/WD-html5-20110405/"><img height="32" width="32" src="https://cdn.simpleicons.org/html5" /></a>
<a href="https://sass-lang.com/"><img height="32" width="32" src="https://cdn.simpleicons.org/sass" /></a>
<a href="https://www.typescriptlang.org/"><img height="32" width="32" src="https://cdn.simpleicons.org/typescript" /></a>
<a href="https://webpack.js.org/"><img height="32" width="32" src="https://cdn.simpleicons.org/webpack" /></a>

## Реализовано
- MVP-архитектура интернет-магазина с каталогом товаров и корзиной

## Запуск
```
npm i
npm run start
```

## Архитектура приложения

Код приложения разделён на 3 слоя согласно парадигме MVP:
- слой данных (модель) отвечает за хранение и изменение данных; представлен следующими классами: CartModel, OrderModel
- слой представления (вью) отвечает за отображение данных на странице; представлен следующими классами: View, ItemView, CartView, FormView, ContactsFormView, OrderFormView, SuccessWindowView, ModalView
- связь представления и данных осуществляется через события, код реализован императивно в index.ts
