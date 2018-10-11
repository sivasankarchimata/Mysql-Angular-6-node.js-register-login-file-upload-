-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2018 at 04:45 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sample_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `state_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `city_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`state_id`, `city_id`, `city_name`) VALUES
(1, 1, 'kochi'),
(1, 2, 'trivendrum'),
(1, 3, 'kotaim'),
(1, 4, 'munnur'),
(2, 5, 'chennai'),
(2, 6, 'madurai'),
(2, 7, 'vellore'),
(2, 8, 'salem'),
(3, 9, 'vijayavada'),
(3, 10, 'guntur'),
(3, 11, 'vizag'),
(3, 12, 'kakinada'),
(4, 13, 'Hyderabad'),
(4, 14, 'nalgonda'),
(4, 15, 'khammam'),
(4, 16, 'warangal');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `file_name` varchar(256) NOT NULL,
  `type` varchar(256) NOT NULL,
  `size` varchar(11) NOT NULL,
  `tmp_name` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `file_name`, `type`, `size`, `tmp_name`) VALUES
(1, '\"+file_name+\"', '\"+type+\"', '\"+size+\"', '\"+tmp_name+\"'),
(2, '0001.jpg', 'image/jpeg', '68093', '1538114669943.0001.jpg'),
(3, '0.jpg', 'image/jpeg', '370486', '1538114813208.0.jpg'),
(4, '0001.jpg', 'image/jpeg', '68093', '1538114813341.0001.jpg'),
(5, '001.jpg', 'image/jpeg', '76617', '1538114813423.001.jpg'),
(6, '01.jpg', 'image/jpeg', '1247604', '1538114813618.01.jpg'),
(7, '002.jpg', 'image/jpeg', '173331', '1538114813747.002.jpg'),
(8, '0001.jpg', 'image/jpeg', '68093', '1538115786920.0001.jpg'),
(9, '01.jpg', 'image/jpeg', '1247604', '1538115836320.01.jpg'),
(10, '0001.jpg', 'image/jpeg', '68093', '1538116028749.0001.jpg'),
(11, '0.jpg', 'image/jpeg', '370486', '1538116191071.0.jpg'),
(12, '0.jpg', 'image/jpeg', '370486', '1538116325943.0.jpg'),
(13, '0.jpg', 'image/jpeg', '370486', '1538116456565.0.jpg'),
(14, '0.jpg', 'image/jpeg', '370486', '1538116609629.0.jpg'),
(15, '0.jpg', 'image/jpeg', '370486', '1538116689878.0.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `fruits`
--

CREATE TABLE `fruits` (
  `fruit_id` int(11) NOT NULL,
  `fruit_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fruits`
--

INSERT INTO `fruits` (`fruit_id`, `fruit_name`) VALUES
(1, 'apples'),
(2, 'mango'),
(3, 'pears'),
(4, 'graphes'),
(5, 'banana'),
(6, 'strawberry');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`state_id`, `state_name`) VALUES
(1, 'kerala'),
(2, 'tamilnadu'),
(3, 'andhra'),
(4, 'Telangana'),
(5, 'karnataka'),
(6, 'maharastra'),
(7, 'Haryana'),
(8, 'punjab');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `address_type` varchar(250) NOT NULL,
  `expiry_date` date NOT NULL,
  `street_address` varchar(250) NOT NULL,
  `state` varchar(250) NOT NULL,
  `city` varchar(250) NOT NULL,
  `zip_code` int(11) NOT NULL,
  `fruits` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `firstname`, `lastname`, `address_type`, `expiry_date`, `street_address`, `state`, `city`, `zip_code`, `fruits`) VALUES
(3, 'srinu', '123456', 'srinu', 'kancha', '', '0000-00-00', '', '', '', 0, ''),
(75, 'siva', '123456', '11111', '111111', '', '0000-00-00', '', '', '', 0, ''),
(77, '1234', '123456', '123456', '123456', '', '0000-00-00', '', '', '', 0, ''),
(78, '\"+userName+\"', '\"+password+\"', '\"+firstName+\"', '\"+lastName+\"', '\"+address_type+\"', '0000-00-00', '\"+street_address+\"', '\"+state+\"', '\"+city+\"', 0, '\"+fruits+\"'),
(79, 'undefined', 'pppp', 'pppp', 'pppp', 'undefined', '0000-00-00', 'undefined', 'undefined', 'undefined', 0, 'undefined');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fruits`
--
ALTER TABLE `fruits`
  ADD PRIMARY KEY (`fruit_id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `fruits`
--
ALTER TABLE `fruits`
  MODIFY `fruit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
