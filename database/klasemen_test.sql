-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 20, 2024 at 02:52 PM
-- Server version: 8.3.0
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `klasemen_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `club`
--

CREATE TABLE `club` (
  `id` int UNSIGNED NOT NULL,
  `nama_club` varchar(100) NOT NULL,
  `kota` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `club`
--

INSERT INTO `club` (`id`, `nama_club`, `kota`) VALUES
(1, 'Persija', 'Jakarta'),
(2, 'Persib', 'Bandung'),
(3, 'Madrid', 'T'),
(5, 'Persela', 'Lamongan'),
(6, 'RANS', 'Jakarta'),
(7, 'Persikabo', 'Kabo');

-- --------------------------------------------------------

--
-- Table structure for table `klasemen`
--

CREATE TABLE `klasemen` (
  `id` int UNSIGNED NOT NULL,
  `nama_club` varchar(100) NOT NULL,
  `main` int UNSIGNED DEFAULT '0',
  `menang` int UNSIGNED DEFAULT '0',
  `seri` int UNSIGNED DEFAULT '0',
  `kalah` int UNSIGNED DEFAULT '0',
  `point` int UNSIGNED DEFAULT '0',
  `gm` int UNSIGNED DEFAULT '0',
  `gk` int UNSIGNED DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `klasemen`
--

INSERT INTO `klasemen` (`id`, `nama_club`, `main`, `menang`, `seri`, `kalah`, `point`, `gm`, `gk`) VALUES
(1, 'Persija', 3, 1, 2, 0, 5, 12, 10),
(2, 'Persib', 3, 1, 1, 1, 4, 10, 17),
(3, 'Madrid', 2, 0, 0, 2, 0, 4, 8),
(4, 'Persela', 1, 0, 1, 0, 1, 3, 3),
(5, 'RANS', 0, 0, 0, 0, 0, 0, 0),
(6, 'Persikabo', 1, 1, 0, 0, 3, 10, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `club`
--
ALTER TABLE `club`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_club` (`nama_club`);

--
-- Indexes for table `klasemen`
--
ALTER TABLE `klasemen`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nama_club` (`nama_club`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `club`
--
ALTER TABLE `club`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `klasemen`
--
ALTER TABLE `klasemen`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `klasemen`
--
ALTER TABLE `klasemen`
  ADD CONSTRAINT `klasemen_ibfk_1` FOREIGN KEY (`nama_club`) REFERENCES `club` (`nama_club`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
