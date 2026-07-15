-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 14, 2026 at 06:02 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lista_tarea_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`, `id_usuario`) VALUES
(4, 'Casa', 2),
(5, 'Comida', 2),
(6, 'Escuela', 2),
(2, 'Facultad', 2),
(7, 'Facultad', 3),
(8, 'Prueba', 4),
(1, 'Trabajo', 2);

-- --------------------------------------------------------

--
-- Table structure for table `detalle_tarea`
--

CREATE TABLE `detalle_tarea` (
  `id_detalle` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_tarea` int NOT NULL,
  `id_estado` int NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_vencimiento` datetime DEFAULT NULL,
  `fecha_finalizacion` datetime DEFAULT NULL,
  `prioridad` enum('Baja','Media','Alta') DEFAULT 'Media'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `detalle_tarea`
--

INSERT INTO `detalle_tarea` (`id_detalle`, `id_usuario`, `id_tarea`, `id_estado`, `fecha_inicio`, `fecha_vencimiento`, `fecha_finalizacion`, `prioridad`) VALUES
(48, 2, 46, 2, '2026-07-12 22:43:00', '2026-07-29 22:43:00', NULL, 'Alta'),
(50, 2, 48, 3, '2026-07-12 23:43:00', '2026-07-30 23:43:00', '2026-07-12 23:46:13', 'Media'),
(51, 4, 49, 1, '2026-07-13 12:42:00', '2026-07-31 12:42:00', NULL, 'Media'),
(52, 4, 50, 1, '2026-07-13 12:47:00', '2026-07-31 12:47:00', NULL, 'Alta'),
(53, 2, 51, 1, '2026-07-13 14:45:00', '2026-07-30 14:45:00', NULL, 'Baja');

-- --------------------------------------------------------

--
-- Table structure for table `estados`
--

CREATE TABLE `estados` (
  `id_estado` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `estados`
--

INSERT INTO `estados` (`id_estado`, `nombre`) VALUES
(1, 'Pendiente'),
(2, 'En progreso'),
(3, 'Completada');

-- --------------------------------------------------------

--
-- Table structure for table `tareas`
--

CREATE TABLE `tareas` (
  `id_tarea` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `id_categoria` int NOT NULL,
  `id_creador` int NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tareas`
--

INSERT INTO `tareas` (`id_tarea`, `nombre`, `descripcion`, `id_categoria`, `id_creador`, `fecha_creacion`) VALUES
(20, 'prueba', 'asldjaskld', 5, 2, '2026-07-12 21:25:27'),
(21, 'prueba', 'asldjaskld', 5, 2, '2026-07-12 21:30:35'),
(22, 'prueba', 'asdasdjasld', 6, 2, '2026-07-12 21:31:16'),
(28, 'esta', 'esta ', 7, 3, '2026-07-12 21:57:01'),
(46, 'Hacer la documentacion', 'Que hace la aplicacion, \r\ncomo esta estructurada,\r\nbase de datos ', 2, 2, '2026-07-13 01:43:41'),
(48, 'Hacer base de datos ', 'asdasd', 2, 2, '2026-07-13 02:43:24'),
(49, 'Prueba', 'Prueba', 8, 4, '2026-07-13 15:42:55'),
(50, 'Segunda prueba', 'Segunda prueba', 8, 4, '2026-07-13 15:47:41'),
(51, 'prueba', 'prueba', 6, 2, '2026-07-13 17:45:30');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(12) NOT NULL,
  `fecha_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `apellido`, `email`, `password`, `fecha_registro`) VALUES
(2, 'Milagros Ailen', 'Curuchet', 'milagroscuruchet03@gmail.com', '123456', '2026-07-09 22:50:42'),
(3, 'segundo', 'Usuario', 'segundousuario@gmail.com', '123456', '2026-07-11 00:59:56'),
(4, 'prueba', 'prueba', 'prueba@gmail.com', 'prueba', '2026-07-13 15:41:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nombre` (`nombre`,`id_usuario`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `detalle_tarea`
--
ALTER TABLE `detalle_tarea`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_tarea` (`id_tarea`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indexes for table `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indexes for table `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_creador` (`id_creador`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `detalle_tarea`
--
ALTER TABLE `detalle_tarea`
  MODIFY `id_detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `estados`
--
ALTER TABLE `estados`
  MODIFY `id_estado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id_tarea` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `categorias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detalle_tarea`
--
ALTER TABLE `detalle_tarea`
  ADD CONSTRAINT `detalle_tarea_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_tarea_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id_tarea`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_tarea_ibfk_3` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tareas_ibfk_2` FOREIGN KEY (`id_creador`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
