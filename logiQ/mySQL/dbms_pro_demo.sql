-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: dbms_pro_demo
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` varchar(36) NOT NULL,
  `quiz_id` varchar(36) NOT NULL,
  `question_text` text NOT NULL,
  `hardness_level` enum('Easy','Medium','Hard') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES ('1fa0d755-04e9-11f0-a46f-bc0ff3d7ad2a','AI','What does AI stand for?','Easy'),('1fa0f343-04e9-11f0-a46f-bc0ff3d7ad2a','AI','Which of the following is an example of AI?','Easy'),('1fa0f5d2-04e9-11f0-a46f-bc0ff3d7ad2a','AI','Which programming language is most commonly used for AI?','Easy'),('1fa0f694-04e9-11f0-a46f-bc0ff3d7ad2a','AI','What is Machine Learning?','Easy'),('1fa0f71d-04e9-11f0-a46f-bc0ff3d7ad2a','AI','Which company developed ChatGPT?','Easy'),('1fa0f79f-04e9-11f0-a46f-bc0ff3d7ad2a','AI','Which of these is a type of AI?','Easy'),('1fa0f81b-04e9-11f0-a46f-bc0ff3d7ad2a','AI','What does NLP stand for in AI?','Easy'),('1fa0f894-04e9-11f0-a46f-bc0ff3d7ad2a','AI','Which AI system defeated humans in chess?','Easy'),('1fa0f930-04e9-11f0-a46f-bc0ff3d7ad2a','AI','What is the difference between Supervised and Unsupervised Learning?','Medium'),('1fa0f9ac-04e9-11f0-a46f-bc0ff3d7ad2a','AI','What is an artificial neural network inspired by?','Medium'),('1fa0fb33-04e9-11f0-a46f-bc0ff3d7ad2a','AI','What is a Turing Test?','Medium'),('1fa0fbc3-04e9-11f0-a46f-bc0ff3d7ad2a','AI','Which AI model is commonly used for image recognition?','Medium'),('1fa0fc4c-04e9-11f0-a46f-bc0ff3d7ad2a','AI','What is the vanishing gradient problem in deep learning?','Hard'),('1fa10075-04e9-11f0-a46f-bc0ff3d7ad2a','AI','How does reinforcement learning differ from supervised learning?','Hard'),('1fa101cd-04e9-11f0-a46f-bc0ff3d7ad2a','AI','What is the role of activation functions in neural networks?','Hard');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questionoption`
--

DROP TABLE IF EXISTS `questionoption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questionoption` (
  `id` varchar(36) NOT NULL,
  `question_id` varchar(36) NOT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `questionoption_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questionoption`
--

LOCK TABLES `questionoption` WRITE;
/*!40000 ALTER TABLE `questionoption` DISABLE KEYS */;
INSERT INTO `questionoption` VALUES ('0415f633-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0d755-04e9-11f0-a46f-bc0ff3d7ad2a','Automated Intelligence',0),('04161310-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0d755-04e9-11f0-a46f-bc0ff3d7ad2a','Artificial Intelligence',1),('041616fe-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0d755-04e9-11f0-a46f-bc0ff3d7ad2a','Advanced Innovation',0),('04161a98-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0d755-04e9-11f0-a46f-bc0ff3d7ad2a','Algorithmic Interaction',0),('04161df8-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f343-04e9-11f0-a46f-bc0ff3d7ad2a','Google Assistant',1),('04162488-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f343-04e9-11f0-a46f-bc0ff3d7ad2a','Microsoft Word',0),('04162848-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f343-04e9-11f0-a46f-bc0ff3d7ad2a','Notepad',0),('04162a51-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f343-04e9-11f0-a46f-bc0ff3d7ad2a','Excel',0),('04162c21-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f5d2-04e9-11f0-a46f-bc0ff3d7ad2a','Python',1),('04162dd4-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f5d2-04e9-11f0-a46f-bc0ff3d7ad2a','C++',0),('04162f50-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f5d2-04e9-11f0-a46f-bc0ff3d7ad2a','JavaScript',0),('041630ca-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f5d2-04e9-11f0-a46f-bc0ff3d7ad2a','Ruby',0),('04163411-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f694-04e9-11f0-a46f-bc0ff3d7ad2a','A type of AI that learns from data',1),('041636e6-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f694-04e9-11f0-a46f-bc0ff3d7ad2a','A robotic system',0),('041639bd-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f694-04e9-11f0-a46f-bc0ff3d7ad2a','A neural network',0),('04163c19-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f694-04e9-11f0-a46f-bc0ff3d7ad2a','An operating system',0),('04163e90-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f71d-04e9-11f0-a46f-bc0ff3d7ad2a','Microsoft',0),('0416414e-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f71d-04e9-11f0-a46f-bc0ff3d7ad2a','Google',0),('041643d6-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f71d-04e9-11f0-a46f-bc0ff3d7ad2a','OpenAI',1),('04164638-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f71d-04e9-11f0-a46f-bc0ff3d7ad2a','Facebook',0),('04164851-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f79f-04e9-11f0-a46f-bc0ff3d7ad2a','Narrow AI',1),('04164b6c-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f79f-04e9-11f0-a46f-bc0ff3d7ad2a','Mechanical AI',0),('04164dc7-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f79f-04e9-11f0-a46f-bc0ff3d7ad2a','Quantum AI',0),('04164fdd-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f79f-04e9-11f0-a46f-bc0ff3d7ad2a','Hardcoded AI',0),('041651ed-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f81b-04e9-11f0-a46f-bc0ff3d7ad2a','Neural Language Processing',0),('041653af-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f81b-04e9-11f0-a46f-bc0ff3d7ad2a','Natural Learning Protocol',0),('04165528-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f81b-04e9-11f0-a46f-bc0ff3d7ad2a','Natural Language Processing',1),('041656a7-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f81b-04e9-11f0-a46f-bc0ff3d7ad2a','New Logical Programming',0),('0416581e-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f894-04e9-11f0-a46f-bc0ff3d7ad2a','DeepMind',0),('0416599a-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f894-04e9-11f0-a46f-bc0ff3d7ad2a','Deep Blue',1),('04165b05-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f894-04e9-11f0-a46f-bc0ff3d7ad2a','AlphaZero',0),('04165c91-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f894-04e9-11f0-a46f-bc0ff3d7ad2a','GPT-4',0),('7f86a296-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f930-04e9-11f0-a46f-bc0ff3d7ad2a','Supervised uses labeled data, Unsupervised does not',1),('7f86e352-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f930-04e9-11f0-a46f-bc0ff3d7ad2a','Unsupervised learning requires human intervention',0),('7f86e59e-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f930-04e9-11f0-a46f-bc0ff3d7ad2a','Supervised learning does not require labels',0),('7f86e6dc-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f930-04e9-11f0-a46f-bc0ff3d7ad2a','Both require labeled data',0),('7f86e800-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f9ac-04e9-11f0-a46f-bc0ff3d7ad2a','The human brain',1),('7f86e973-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f9ac-04e9-11f0-a46f-bc0ff3d7ad2a','Mathematical formulas',0),('7f86eb53-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f9ac-04e9-11f0-a46f-bc0ff3d7ad2a','Electronic circuits',0),('7f86ed40-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0f9ac-04e9-11f0-a46f-bc0ff3d7ad2a','Quantum mechanics',0),('7f86ef2a-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fb33-04e9-11f0-a46f-bc0ff3d7ad2a','A test to determine if AI behaves like a human',1),('7f86f120-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fb33-04e9-11f0-a46f-bc0ff3d7ad2a','A test for measuring AI speed',0),('7f86f59c-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fb33-04e9-11f0-a46f-bc0ff3d7ad2a','A method for training deep learning models',0),('7f86f6f3-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fb33-04e9-11f0-a46f-bc0ff3d7ad2a','A benchmark for evaluating data',0),('7f86f822-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fbc3-04e9-11f0-a46f-bc0ff3d7ad2a','Convolutional Neural Networks (CNNs)',1),('7f86f969-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fbc3-04e9-11f0-a46f-bc0ff3d7ad2a','Recurrent Neural Networks (RNNs)',0),('7f86fa7b-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fbc3-04e9-11f0-a46f-bc0ff3d7ad2a','Bayesian Networks',0),('7f86fb87-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fbc3-04e9-11f0-a46f-bc0ff3d7ad2a','Support Vector Machines (SVMs)',0),('9c99f458-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fc4c-04e9-11f0-a46f-bc0ff3d7ad2a','When gradients become too small in deep networks',1),('9c9a1a0c-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fc4c-04e9-11f0-a46f-bc0ff3d7ad2a','When weights in a model become too large',0),('9c9a1c2f-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fc4c-04e9-11f0-a46f-bc0ff3d7ad2a','When an AI model cannot process new inputs',0),('9c9a1d83-04ea-11f0-a46f-bc0ff3d7ad2a','1fa0fc4c-04e9-11f0-a46f-bc0ff3d7ad2a','When data vanishes during training',0),('9c9a1ea8-04ea-11f0-a46f-bc0ff3d7ad2a','1fa10075-04e9-11f0-a46f-bc0ff3d7ad2a','Reinforcement learning uses rewards, supervised learning uses labeled data',1),('9c9a1fbd-04ea-11f0-a46f-bc0ff3d7ad2a','1fa10075-04e9-11f0-a46f-bc0ff3d7ad2a','Supervised learning uses rewards, reinforcement learning does not',0),('9c9a20d8-04ea-11f0-a46f-bc0ff3d7ad2a','1fa10075-04e9-11f0-a46f-bc0ff3d7ad2a','Both are the same',0),('9c9a225c-04ea-11f0-a46f-bc0ff3d7ad2a','1fa10075-04e9-11f0-a46f-bc0ff3d7ad2a','Reinforcement learning does not learn over time',0),('9c9a2471-04ea-11f0-a46f-bc0ff3d7ad2a','1fa101cd-04e9-11f0-a46f-bc0ff3d7ad2a','They introduce non-linearity in models',1),('9c9a2694-04ea-11f0-a46f-bc0ff3d7ad2a','1fa101cd-04e9-11f0-a46f-bc0ff3d7ad2a','They store training data',0),('9c9a28ab-04ea-11f0-a46f-bc0ff3d7ad2a','1fa101cd-04e9-11f0-a46f-bc0ff3d7ad2a','They reduce model size',0),('9c9a2ad3-04ea-11f0-a46f-bc0ff3d7ad2a','1fa101cd-04e9-11f0-a46f-bc0ff3d7ad2a','They act as a filter for neurons',0);
/*!40000 ALTER TABLE `questionoption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image_url` varchar(512) DEFAULT NULL,
  `total_marks` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES ('AI','Artificial Intelligence Quiz','Learn about AI and its applications in real-world scenarios!','https://i.pinimg.com/736x/ad/c8/46/adc8460bac925350847b370b10c264ce.jpg',15),('Algo','Algorithm Quiz','Test your knowledge on algorithms and their complexities!','https://i.pinimg.com/736x/75/22/17/752217ab83fa9c08ad8ff8f66a8b54db.jpg',15),('DBMS','DBMS Quiz','Test your knowledge on database management systems!','https://i.pinimg.com/736x/93/5f/7a/935f7aa621c095a26be3ee1281f20ab3.jpg',15),('DS','Data Structures Quiz','Test your knowledge on data structures and algorithms!','https://miro.medium.com/v2/resize:fit:1100/format:webp/0*yN7Ye4QA18INJadC.jpg',15),('OS','Operating Systems Quiz','Learn about operating systems and their functions!','https://i.pinimg.com/736x/25/30/50/253050a72b895de7b620decc08bcaffc.jpg',15);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `marks` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('0845bb09-04c6-11f0-a46f-bc0ff3d7ad2a','Alice Johnson','alice@example.com','$2a$10$exampleHash1',0),('08461345-04c6-11f0-a46f-bc0ff3d7ad2a','Bob Smith','bob@example.com','$2a$10$exampleHash2',0),('08461718-04c6-11f0-a46f-bc0ff3d7ad2a','Charlie Davis','charlie@example.com','$2a$10$exampleHash3',0),('084617cc-04c6-11f0-a46f-bc0ff3d7ad2a','David Brown','david@example.com','$2a$10$exampleHash4',0),('0846188f-04c6-11f0-a46f-bc0ff3d7ad2a','Emma Wilson','emma@example.com','$2a$10$exampleHash5',0),('2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','Shivang','shivangsharma0630@gmail.com','$2b$10$iem6panXqiAH7welfzBsBu2d3Vq4OzCZyTmu1Y3w15QuC2uFO92C.',13),('3c4add4d-e10d-4c99-a2ff-efa3d2448929','abc','def','$2b$10$L3aHyd9rTfmicCqiOP6F.exJDv7JO4vebnQJSgBpTazm5PObrF5wu',14),('3e966c29-fbfd-4611-8106-0ddcf4eb3ff9','arav','jadonarav28082@gmail.com','$2b$10$DjTIwEKSivhsBLgkTjxoX.qAfEk.HRhFeTBoBF7FIp05rYBxu92mq',4),('47278f6c-8f1d-4a43-aac2-a7c964a1b1e4','shivam','user@gmail.com','$2b$10$E9Le1T8rEsMYo/YfOQXzze4WjiHKwusj44do7YLpXUdRI/miflo2K',4),('779ecb85-fc90-4e8f-99f3-bb5e5be636af','123','123','$2b$10$nfT7M3jmJp.JwKArqTKRJOWqfBvx6qA9/1Qs51GtpbovH4uP.1J4i',31),('a1669872-eccd-41b7-b471-35b257f932f6','hello ','idk','$2b$10$rhOiQKJqO/.OpShUfkPm4ObYu5IXjZfCjT4Ef03q39Up9qCsNUlhu',0),('c8b49a22-0e57-4bd1-93d1-49ae0b0a8dd2','yamal','aoghk','$2b$10$qWwS0xwrIeZCg4vPIBlr0exvBWy35eqXE2yxgAfkmjUK1XXgLjQOu',4),('db4919e7-6e89-47d3-be49-3ced2eb62ec2','Aashish','abc','$2b$10$JsYIdRtN/u835oB9qFzYlelP/E6M6Y64hzzb0OUJ81BKltX13BAlG',5),('e2baed88-ab1d-45a2-ab0f-cb9e2e86c629','niggameister',',jbk,j','$2b$10$wmYY89fNVcgT2mj9mWUhReGjxvD3tS0XDcEdQJv9QeK2EoXh8udNK',1);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `studentquiz`
--

DROP TABLE IF EXISTS `studentquiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `studentquiz` (
  `id` varchar(36) NOT NULL,
  `student_id` varchar(36) NOT NULL,
  `quiz_id` varchar(36) NOT NULL,
  `score` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `quiz_id` (`quiz_id`),
  CONSTRAINT `studentquiz_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE,
  CONSTRAINT `studentquiz_ibfk_2` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `studentquiz`
--

LOCK TABLES `studentquiz` WRITE;
/*!40000 ALTER TABLE `studentquiz` DISABLE KEYS */;
INSERT INTO `studentquiz` VALUES ('06c63647-065b-11f0-af84-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',1),('0b21d6e5-065b-11f0-af84-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',1),('0e57c37a-058a-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',1),('1b3216ba-073d-11f0-af84-bc0ff3d7ad2a','779ecb85-fc90-4e8f-99f3-bb5e5be636af','AI',11),('1fc02228-0592-11f0-a46f-bc0ff3d7ad2a','3c4add4d-e10d-4c99-a2ff-efa3d2448929','AI',14),('34378f9c-057d-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('4b24b8dc-057d-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('4e61f858-057c-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('58944be4-057d-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('63f8def7-057d-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('66a49c26-0607-11f0-af84-bc0ff3d7ad2a','47278f6c-8f1d-4a43-aac2-a7c964a1b1e4','AI',4),('7866ec1f-066e-11f0-af84-bc0ff3d7ad2a','3e966c29-fbfd-4611-8106-0ddcf4eb3ff9','AI',4),('7ad3dd76-058a-11f0-a46f-bc0ff3d7ad2a','c8b49a22-0e57-4bd1-93d1-49ae0b0a8dd2','AI',0),('7c43f95d-058b-11f0-a46f-bc0ff3d7ad2a','c8b49a22-0e57-4bd1-93d1-49ae0b0a8dd2','AI',1),('7d9d6f18-058a-11f0-a46f-bc0ff3d7ad2a','c8b49a22-0e57-4bd1-93d1-49ae0b0a8dd2','OS',0),('97f640a6-058a-11f0-a46f-bc0ff3d7ad2a','c8b49a22-0e57-4bd1-93d1-49ae0b0a8dd2','AI',1),('9c1cc8f6-058a-11f0-a46f-bc0ff3d7ad2a','c8b49a22-0e57-4bd1-93d1-49ae0b0a8dd2','AI',1),('a17ae3c6-058a-11f0-a46f-bc0ff3d7ad2a','c8b49a22-0e57-4bd1-93d1-49ae0b0a8dd2','AI',1),('a4680f59-0589-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',2),('a601d874-065b-11f0-af84-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',1),('aa1323a9-057d-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('acad1644-0589-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',2),('b3935bcb-066e-11f0-af84-bc0ff3d7ad2a','3e966c29-fbfd-4611-8106-0ddcf4eb3ff9','OS',0),('b621faf8-0589-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',2),('bb96b2f2-057d-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('c0215cc5-057c-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('ce970e9e-05aa-11f0-a46f-bc0ff3d7ad2a','db4919e7-6e89-47d3-be49-3ced2eb62ec2','AI',5),('e01efcb5-057d-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',0),('e5ba3536-057d-11f0-a46f-bc0ff3d7ad2a','2766b1b5-cd13-40a0-b4ff-ba21dd009c1d','AI',3),('f143d0ad-073b-11f0-af84-bc0ff3d7ad2a','e2baed88-ab1d-45a2-ab0f-cb9e2e86c629','AI',1);
/*!40000 ALTER TABLE `studentquiz` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-23 20:07:13
