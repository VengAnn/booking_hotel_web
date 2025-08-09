-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jul 27, 2025 at 01:30 PM
-- Server version: 8.0.35
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking_hotel_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `amenities`
--

CREATE TABLE `amenities` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `amenities`
--

INSERT INTO `amenities` (`id`, `name`, `img_url`, `created_at`, `updated_at`) VALUES
(1, 'Máy lạnh', 'amenities/68839e419923e_air-conditioner.png', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 'Máy sưởi', 'amenities/68839e419ce15_heater.png', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 'Smart TV', 'amenities/68839e419d1c6_smart-tv.png', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(4, 'Spa', 'amenities/68839e419d59f_spa.png', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(5, 'Nước sạch', 'amenities/68839e419d8f6_water-quality.png', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(6, 'Wi-Fi miễn phí', 'amenities/68839e419dd9e_wifi.png', '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `room_id` bigint UNSIGNED NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `price_per_night` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `is_reviewed` tinyint(1) NOT NULL DEFAULT '0',
  `status` enum('booked','checked_in','completed','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'booked',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `room_id`, `check_in_date`, `check_out_date`, `price_per_night`, `total`, `is_reviewed`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 26, '2025-08-01', '2025-08-04', 1400000.00, 4200000.00, 0, 'booked', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 3, 21, '2025-07-31', '2025-08-03', 1100000.00, 3300000.00, 0, 'booked', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 4, 23, '2025-08-01', '2025-08-02', 1100000.00, 1100000.00, 0, 'booked', '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`id`, `name`, `img_url`, `created_at`, `updated_at`) VALUES
(1, 'Bể bơi', NULL, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 'Phòng gym', NULL, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 'Bãi đỗ xe', NULL, '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `name`, `email`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 'Nguyễn Văn A', 'vana@example.com', 'Khách sạn rất tuyệt vời, tôi sẽ quay lại lần sau!', 0, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 'Trần Thị B', 'thib@example.com', 'Nhân viên phục vụ nhiệt tình, phòng ốc sạch sẽ.', 1, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 'Lê Văn C', 'vanc@example.com', 'Cần cải thiện wifi và điều hòa.', 0, '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `invalidate_token_tbs`
--

CREATE TABLE `invalidate_token_tbs` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `access_tk` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `expired_tk` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '2025_06_04_165718_room_types', 1),
(3, '2025_07_01_011930_create_rooms_table', 1),
(4, '2025_07_01_021930_create_amenities_table', 1),
(5, '2025_07_01_031930_create_room_type_amenities_table', 1),
(6, '2025_07_01_051930_create_reviews_table', 1),
(7, '2025_07_01_071930_create_bookings_table', 1),
(8, '2025_07_01_071930_create_payments_table', 1),
(9, '2025_07_01_074343_create_invalidate_token_tbs_table', 1),
(10, '2025_07_02_031529_create_facilities_table', 1),
(11, '2025_07_02_031632_create_room_type_facilities_table', 1),
(12, '2025_07_05_141332_create_slides_table', 1),
(13, '2025_07_05_151647_create_feedback_table', 1),
(14, '2025_07_07_154618_create_room_type_images_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint UNSIGNED NOT NULL,
  `booking_id` bigint UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `method` enum('cash','card','ABA','Wing','PiPay') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'cash',
  `status` enum('paid','pending','failed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `booking_id`, `amount`, `paid_at`, `method`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 4200000.00, NULL, 'cash', 'pending', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 2, 3300000.00, NULL, 'cash', 'pending', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 3, 1100000.00, NULL, 'cash', 'pending', '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `room_id` bigint UNSIGNED NOT NULL,
  `rating` tinyint UNSIGNED NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `room_id`, `rating`, `comment`, `created_at`, `updated_at`) VALUES
(1, 4, 1, 4, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 3, 1, 4, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 2, 1, 3, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(4, 4, 2, 4, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(5, 3, 2, 3, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(6, 2, 2, 3, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(7, 4, 3, 3, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(8, 3, 3, 5, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(9, 2, 3, 3, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(10, 4, 4, 4, 'Phòng hơi nhỏ nhưng sạch sẽ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(11, 3, 4, 5, 'Tuyệt vời, không có gì để chê.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(12, 2, 4, 5, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(13, 4, 5, 5, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(14, 3, 5, 3, 'Tuyệt vời, không có gì để chê.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(15, 2, 5, 3, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(16, 4, 6, 4, 'Giá cả hợp lý, sẽ quay lại lần sau.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(17, 3, 6, 3, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(18, 2, 6, 3, 'Vị trí thuận tiện, gần trung tâm.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(19, 4, 7, 5, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(20, 3, 7, 3, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(21, 2, 7, 4, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(22, 4, 8, 4, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(23, 3, 8, 5, 'Giá cả hợp lý, sẽ quay lại lần sau.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(24, 2, 8, 5, 'Phòng hơi nhỏ nhưng sạch sẽ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(25, 4, 9, 4, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(26, 3, 9, 4, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(27, 2, 9, 3, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(28, 4, 10, 4, 'Vị trí thuận tiện, gần trung tâm.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(29, 3, 10, 4, 'Vị trí thuận tiện, gần trung tâm.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(30, 2, 10, 5, 'Phòng hơi nhỏ nhưng sạch sẽ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(31, 4, 11, 5, 'Tuyệt vời, không có gì để chê.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(32, 3, 11, 3, 'Tôi rất hài lòng với kỳ nghỉ tại đây.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(33, 2, 11, 4, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(34, 4, 12, 4, 'Phòng rất sạch sẽ và thoáng mát.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(35, 3, 12, 5, 'Phòng hơi nhỏ nhưng sạch sẽ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(36, 2, 12, 5, 'Phòng hơi nhỏ nhưng sạch sẽ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(37, 4, 13, 5, 'Tôi rất hài lòng với kỳ nghỉ tại đây.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(38, 3, 13, 5, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(39, 2, 13, 3, 'Phòng hơi nhỏ nhưng sạch sẽ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(40, 4, 14, 5, 'Tuyệt vời, không có gì để chê.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(41, 3, 14, 3, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(42, 2, 14, 4, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(43, 4, 15, 3, 'Giá cả hợp lý, sẽ quay lại lần sau.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(44, 3, 15, 3, 'Tuyệt vời, không có gì để chê.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(45, 2, 15, 5, 'Phòng rất sạch sẽ và thoáng mát.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(46, 4, 16, 3, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(47, 3, 16, 4, 'Tôi rất hài lòng với kỳ nghỉ tại đây.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(48, 2, 16, 4, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(49, 4, 17, 4, 'Vị trí thuận tiện, gần trung tâm.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(50, 3, 17, 5, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(51, 2, 17, 3, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(52, 4, 18, 5, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(53, 3, 18, 5, 'Vị trí thuận tiện, gần trung tâm.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(54, 2, 18, 5, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(55, 4, 19, 4, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(56, 3, 19, 5, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(57, 2, 19, 5, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(58, 4, 20, 3, 'Giá cả hợp lý, sẽ quay lại lần sau.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(59, 3, 20, 5, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(60, 2, 20, 3, 'Vị trí thuận tiện, gần trung tâm.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(61, 4, 21, 4, 'Tuyệt vời, không có gì để chê.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(62, 3, 21, 4, 'Phòng rất sạch sẽ và thoáng mát.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(63, 2, 21, 3, 'Vị trí thuận tiện, gần trung tâm.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(64, 4, 22, 5, 'Phòng rất sạch sẽ và thoáng mát.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(65, 3, 22, 5, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(66, 2, 22, 3, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(67, 4, 23, 3, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(68, 3, 23, 5, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(69, 2, 23, 3, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(70, 4, 24, 3, 'Phòng đẹp, đầy đủ tiện nghi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(71, 3, 24, 3, 'Phòng rất sạch sẽ và thoáng mát.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(72, 2, 24, 3, 'Giá cả hợp lý, sẽ quay lại lần sau.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(73, 4, 25, 4, 'Tôi rất hài lòng với kỳ nghỉ tại đây.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(74, 3, 25, 4, 'Tôi rất hài lòng với kỳ nghỉ tại đây.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(75, 2, 25, 3, 'Phòng hơi nhỏ nhưng sạch sẽ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(76, 4, 26, 5, 'Tuyệt vời, không có gì để chê.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(77, 3, 26, 3, 'Rất thích không gian và cách phục vụ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(78, 2, 26, 3, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(79, 4, 27, 5, 'Phòng hơi nhỏ nhưng sạch sẽ.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(80, 3, 27, 3, 'Tuyệt vời, không có gì để chê.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(81, 2, 27, 5, 'Giá cả hợp lý, sẽ quay lại lần sau.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(82, 4, 28, 3, 'Chất lượng dịch vụ tốt hơn mong đợi.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(83, 3, 28, 5, 'Tôi rất hài lòng với kỳ nghỉ tại đây.', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(84, 2, 28, 5, 'Dịch vụ tốt, nhân viên thân thiện.', '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` bigint UNSIGNED NOT NULL,
  `room_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_type_id` bigint UNSIGNED NOT NULL,
  `status` enum('available','in use','maintenance') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `room_number`, `room_type_id`, `status`, `created_at`, `updated_at`) VALUES
(1, '101', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, '102', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, '103', 3, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(4, '104', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(5, '105', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(6, '106', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(7, '107', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(8, '201', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(9, '202', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(10, '203', 3, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(11, '204', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(12, '205', 3, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(13, '206', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(14, '207', 3, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(15, '301', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(16, '302', 3, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(17, '303', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(18, '304', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(19, '305', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(20, '306', 3, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(21, '307', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(22, '401', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(23, '402', 1, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(24, '403', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(25, '404', 3, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(26, '405', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(27, '406', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(28, '407', 2, 'available', '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `capacity` int UNSIGNED NOT NULL DEFAULT '1',
  `price_per_night` decimal(10,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `adults_capacity` int NOT NULL,
  `children_capacity` int NOT NULL,
  `bed_count` tinyint UNSIGNED NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`id`, `name`, `capacity`, `price_per_night`, `description`, `adults_capacity`, `children_capacity`, `bed_count`, `created_at`, `updated_at`) VALUES
(1, 'Standard Room', 3, 1100000.00, 'Phòng tiêu chuẩn với diện tích vừa đủ, phù hợp cho khách cá nhân hoặc cặp đôi.', 2, 1, 1, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 'Phòng Đôi Cao Cấp', 4, 1400000.00, 'Phòng rộng rãi với giường đôi lớn, thiết kế hiện đại pha nét truyền thống.', 2, 2, 1, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 'Phòng Gia Đình', 5, 800000.00, 'Phòng rộng nhất, bố trí 2 giường đôi hoặc giường đôi + giường đơn, thích hợp cho gia đình.', 3, 2, 2, '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `room_type_amenities`
--

CREATE TABLE `room_type_amenities` (
  `id` bigint UNSIGNED NOT NULL,
  `room_type_id` bigint UNSIGNED NOT NULL,
  `amenity_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_type_amenities`
--

INSERT INTO `room_type_amenities` (`id`, `room_type_id`, `amenity_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 1, 4, NULL, NULL),
(4, 1, 5, NULL, NULL),
(5, 2, 1, NULL, NULL),
(6, 2, 3, NULL, NULL),
(7, 2, 5, NULL, NULL),
(8, 2, 6, NULL, NULL),
(9, 3, 1, NULL, NULL),
(10, 3, 2, NULL, NULL),
(11, 3, 4, NULL, NULL),
(12, 3, 5, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room_type_facilities`
--

CREATE TABLE `room_type_facilities` (
  `id` bigint UNSIGNED NOT NULL,
  `room_type_id` bigint UNSIGNED NOT NULL,
  `facility_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_type_facilities`
--

INSERT INTO `room_type_facilities` (`id`, `room_type_id`, `facility_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 2, NULL, NULL),
(3, 1, 3, NULL, NULL),
(4, 2, 1, NULL, NULL),
(5, 2, 2, NULL, NULL),
(6, 2, 3, NULL, NULL),
(7, 3, 1, NULL, NULL),
(8, 3, 2, NULL, NULL),
(9, 3, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `room_type_images`
--

CREATE TABLE `room_type_images` (
  `id` bigint UNSIGNED NOT NULL,
  `room_type_id` bigint UNSIGNED NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_type_images`
--

INSERT INTO `room_type_images` (`id`, `room_type_id`, `img_url`, `created_at`, `updated_at`) VALUES
(1, 1, 'room_type_images/68839e41a05dd_deluxe-double-1.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 1, 'room_type_images/68839e41a151f_deluxe-double-2.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 1, 'room_type_images/68839e41a1914_deluxe-double-3.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(4, 1, 'room_type_images/68839e41a1d22_deluxe-double-4.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(5, 2, 'room_type_images/68839e41a2793_superior-double-1.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(6, 2, 'room_type_images/68839e41a2b81_superior-double-2.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(7, 2, 'room_type_images/68839e41a2e6b_superior-double-3.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(8, 2, 'room_type_images/68839e41a31cc_superior-double-4.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(9, 3, 'room_type_images/68839e41a3c08_superior-twin-1.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(10, 3, 'room_type_images/68839e41a4050_superior-twin-2.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(11, 3, 'room_type_images/68839e41a43fe_superior-twin-3.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(12, 3, 'room_type_images/68839e41a4791_superior-twin-4.avif', '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `slides`
--

CREATE TABLE `slides` (
  `id` bigint UNSIGNED NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `slides`
--

INSERT INTO `slides` (`id`, `img_url`, `order`, `created_at`, `updated_at`) VALUES
(1, 'slides/slide_1_zBY7Bo5d.png', 1, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 'slides/slide_2_9swzLk4e.png', 2, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 'slides/slide_3_OQNGxZWC.png', 3, '2025-07-25 08:09:53', '2025-07-25 08:09:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_profile` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_role` enum('user','admin','staff') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `phone`, `user_profile`, `user_role`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', '$2y$12$Pdp6mhulJQSbfHN6qJuLAuxjs8IrvCB64JrvFxCc7JgCiJG4OKOdW', '0900000001', NULL, 'admin', 1, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(2, 'sokha', 'sokha@gmail.com', '$2y$12$Pdp6mhulJQSbfHN6qJuLAuxjs8IrvCB64JrvFxCc7JgCiJG4OKOdW', '0900000003', NULL, 'user', 1, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(3, 'dara', 'dara@gmail.com', '$2y$12$Pdp6mhulJQSbfHN6qJuLAuxjs8IrvCB64JrvFxCc7JgCiJG4OKOdW', '0900000004', NULL, 'user', 1, '2025-07-25 08:09:53', '2025-07-25 08:09:53'),
(4, 'rathana', 'rathana@gmail.com', '$2y$12$Pdp6mhulJQSbfHN6qJuLAuxjs8IrvCB64JrvFxCc7JgCiJG4OKOdW', '0900000005', NULL, 'user', 1, '2025-07-25 08:09:53', '2025-07-25 08:09:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookings_user_id_foreign` (`user_id`),
  ADD KEY `bookings_room_id_foreign` (`room_id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invalidate_token_tbs`
--
ALTER TABLE `invalidate_token_tbs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invalidate_token_tbs_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_booking_id_foreign` (`booking_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`),
  ADD KEY `reviews_room_id_foreign` (`room_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rooms_room_type_id_foreign` (`room_type_id`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_type_amenities`
--
ALTER TABLE `room_type_amenities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_type_amenities_room_type_id_foreign` (`room_type_id`),
  ADD KEY `room_type_amenities_amenity_id_foreign` (`amenity_id`);

--
-- Indexes for table `room_type_facilities`
--
ALTER TABLE `room_type_facilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_type_facilities_room_type_id_foreign` (`room_type_id`),
  ADD KEY `room_type_facilities_facility_id_foreign` (`facility_id`);

--
-- Indexes for table `room_type_images`
--
ALTER TABLE `room_type_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `room_type_images_room_type_id_foreign` (`room_type_id`);

--
-- Indexes for table `slides`
--
ALTER TABLE `slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `amenities`
--
ALTER TABLE `amenities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invalidate_token_tbs`
--
ALTER TABLE `invalidate_token_tbs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `room_type_amenities`
--
ALTER TABLE `room_type_amenities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `room_type_facilities`
--
ALTER TABLE `room_type_facilities`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `room_type_images`
--
ALTER TABLE `room_type_images`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `slides`
--
ALTER TABLE `slides`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invalidate_token_tbs`
--
ALTER TABLE `invalidate_token_tbs`
  ADD CONSTRAINT `invalidate_token_tbs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_room_type_id_foreign` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `room_type_amenities`
--
ALTER TABLE `room_type_amenities`
  ADD CONSTRAINT `room_type_amenities_amenity_id_foreign` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `room_type_amenities_room_type_id_foreign` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `room_type_facilities`
--
ALTER TABLE `room_type_facilities`
  ADD CONSTRAINT `room_type_facilities_facility_id_foreign` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `room_type_facilities_room_type_id_foreign` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `room_type_images`
--
ALTER TABLE `room_type_images`
  ADD CONSTRAINT `room_type_images_room_type_id_foreign` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
