-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 13 2017 г., 23:42
-- Версия сервера: 5.6.37
-- Версия PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `updateproducts`
--

-- --------------------------------------------------------

--
-- Структура таблицы `errors`
--

CREATE TABLE `errors` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `id_from_products_list` int(11) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `errors`
--

INSERT INTO `errors` (`id`, `product_id`, `id_from_products_list`, `text`) VALUES
(1, 123, 321, 'asdasd');

-- --------------------------------------------------------

--
-- Структура таблицы `errors_log`
--

CREATE TABLE `errors_log` (
  `id` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `error_code` int(11) NOT NULL,
  `data` text NOT NULL,
  `url` text,
  `shop` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `products_list`
--

CREATE TABLE `products_list` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `parsing_url` text NOT NULL,
  `product_url` text NOT NULL,
  `product_quantiti` int(11) NOT NULL,
  `product_price` int(11) NOT NULL,
  `date_upload_product_in_list` int(11) NOT NULL,
  `date_update` int(11) NOT NULL,
  `date_upload` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `products_list`
--

INSERT INTO `products_list` (`id`, `product_id`, `parsing_url`, `product_url`, `product_quantiti`, `product_price`, `date_upload_product_in_list`, `date_update`, `date_upload`, `status`) VALUES
(1, 91, 'http://magia-sveta.ru/product/16000', 'https://mnogosveta.su/shop/bra/alfa-16000/', 2, 3560, 1508153061, 1508153062, 1508153064, 2),
(2, 89, 'http://magia-sveta.ru/product/HARY-3', 'https://mnogosveta.su/shop/lyustry/italux-hary-3/', 3, 4200, 1508153061, 1508153062, 1508153066, 2),
(3, 87, 'http://magia-sveta.ru/product/14118195-Ni', 'https://mnogosveta.su/shop/lyustry/bohemia-ivele-crystal-1411-8-195-ni/', 7, 41982, 1508153061, 1508153063, 1508153067, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `settings`
--

INSERT INTO `settings` (`id`, `title`, `value`) VALUES
(1, 'last_update', '1508153067'),
(2, 'quantiti_products', '3'),
(3, 'last_update', '1508153067'),
(4, 'continue_update', '0'),
(5, 'progress_status', '---'),
(7, 'time_of_start_updating', '1508153058'),
(8, 'status_step_updating', '3'),
(9, 'end_of_updating', '1508153067');

-- --------------------------------------------------------

--
-- Структура таблицы `to_remove`
--

CREATE TABLE `to_remove` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `id_from_products_list` int(11) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `to_remove`
--

INSERT INTO `to_remove` (`id`, `product_id`, `id_from_products_list`, `text`) VALUES
(1, 0, 1111, '5222'),
(2, 0, 1, '(SELECT `text` FROM `errors` WHERE `id_from_products_list`=\r\n        (\r\n            SELECT `id` FROM `products_list` WHERE `product_id`=113317\r\n        )\r\n    )'),
(3, 0, 6, 'Page donot load');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `errors`
--
ALTER TABLE `errors`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `errors_log`
--
ALTER TABLE `errors_log`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products_list`
--
ALTER TABLE `products_list`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `to_remove`
--
ALTER TABLE `to_remove`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `errors`
--
ALTER TABLE `errors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `errors_log`
--
ALTER TABLE `errors_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `products_list`
--
ALTER TABLE `products_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT для таблицы `to_remove`
--
ALTER TABLE `to_remove`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
