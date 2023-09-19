-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Wrz 2023, 21:44
-- Wersja serwera: 10.4.24-MariaDB
-- Wersja PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `betterdaydb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `habits`
--

CREATE TABLE `habits` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `HabitID` int(11) DEFAULT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `habits`
--

INSERT INTO `habits` (`ID`, `UserID`, `Date`, `HabitID`, `Status`) VALUES
(1, 1, '2023-09-19', 1, 0),
(2, 1, '2023-09-19', 2, 1),
(3, 1, '2023-09-19', 3, 0),
(4, 1, '2023-09-20', 1, 0),
(5, 1, '2023-09-20', 2, 0),
(6, 1, '2023-09-20', 3, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `habitslist`
--

CREATE TABLE `habitslist` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `habitslist`
--

INSERT INTO `habitslist` (`ID`, `UserID`, `Title`) VALUES
(1, 1, 'Workout'),
(2, 1, 'Reading'),
(3, 1, 'Learning');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notes`
--

CREATE TABLE `notes` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `Note` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `notes`
--

INSERT INTO `notes` (`ID`, `UserID`, `Date`, `Note`) VALUES
(1, 1, '2023-09-19', 'Today I created this beautiful database.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `tasks`
--

CREATE TABLE `tasks` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `Title` varchar(50) NOT NULL,
  `Status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `tasks`
--

INSERT INTO `tasks` (`ID`, `UserID`, `Date`, `Title`, `Status`) VALUES
(1, 1, '2023-09-19', 'Wash the dishes', 0),
(2, 1, '2023-09-19', 'Mow the grass', 1),
(3, 2, '2023-09-20', 'Clean the house', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`ID`, `Username`, `Password`) VALUES
(1, 'Piotrekfolt1', 'test'),
(2, 'IzakTV', 'test');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `habits`
--
ALTER TABLE `habits`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `HabitID` (`HabitID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `habitslist`
--
ALTER TABLE `habitslist`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `habits`
--
ALTER TABLE `habits`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `habitslist`
--
ALTER TABLE `habitslist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `notes`
--
ALTER TABLE `notes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `tasks`
--
ALTER TABLE `tasks`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `habits`
--
ALTER TABLE `habits`
  ADD CONSTRAINT `habits_ibfk_1` FOREIGN KEY (`HabitID`) REFERENCES `habitslist` (`ID`),
  ADD CONSTRAINT `habits_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);

--
-- Ograniczenia dla tabeli `habitslist`
--
ALTER TABLE `habitslist`
  ADD CONSTRAINT `habitslist_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);

--
-- Ograniczenia dla tabeli `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);

--
-- Ograniczenia dla tabeli `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
