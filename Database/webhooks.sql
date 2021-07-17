-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2021 at 04:27 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webhooks`
--

-- --------------------------------------------------------

--
-- Table structure for table `webhook_data`
--

CREATE TABLE `webhook_data` (
  `id` bigint(15) NOT NULL,
  `targetUrl` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `webhook_data`
--

INSERT INTO `webhook_data` (`id`, `targetUrl`) VALUES
(1, 'www.goog.com'),
(2, 'www.yahoo.com'),
(3, 'www.hell.com'),
(10, 'www.simple.com'),
(11, 'www.simple.com'),
(12, 'www.simple.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `webhook_data`
--
ALTER TABLE `webhook_data`
  ADD PRIMARY KEY (`id`) USING BTREE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
