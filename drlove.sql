-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 13, 2013 at 12:53 AM
-- Server version: 5.5.32
-- PHP Version: 5.3.10-1ubuntu3.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `drlove`
--

-- --------------------------------------------------------

--
-- Table structure for table `dllog`
--

CREATE TABLE IF NOT EXISTS `dllog` (
  `status` tinyint(1) NOT NULL,
  `passwd` varchar(128) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dllog`
--

INSERT INTO `dllog` (`status`, `passwd`) VALUES
(0, '4e27f2226785e9abbe046fc592668860');

-- --------------------------------------------------------

--
-- Table structure for table `dlposts`
--

CREATE TABLE IF NOT EXISTS `dlposts` (
  `pos` int(10) unsigned NOT NULL,
  `uid` int(11) unsigned NOT NULL,
  `date` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `text` text COLLATE utf8_unicode_ci NOT NULL,
  `pshow` tinyint(1) NOT NULL,
  PRIMARY KEY (`pos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dlposts`
--

INSERT INTO `dlposts` (`pos`, `uid`, `date`, `name`, `text`, `pshow`) VALUES
(1, 3, '12.September.2013', 'character+test', '%60%7E%21%40%23%24%25%5E%26%2A%28%29_%2B-%3D%7B%7D%7C%5B%5D%5C%3A%22%3B%27%3C%3E%3F%2C.%2F+%0A%C5%A0%C4%90%C5%BD%C4%8C%C4%86%C7%88%C7%85%C7%8B+%27ker%27+%22ker%22+%5C+a%5C+%5Ca', 1),
(2, 4, '11.September.2013', '123456789+123456789+123456789+123456789+123456789+123456789+1234', 'this+is+the+longest+name+that+can+be%2C%0Ait%27s+64+chars+long', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
