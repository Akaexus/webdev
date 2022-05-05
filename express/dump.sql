/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
drop table products;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
INSERT INTO `products` VALUES (1,'Krew suszona - Hemoglobina 500g'),(2,'Kukurydza prażona solona 1 kg'),(3,'ZESTAW 6X Napój owsiany bezglutenowy BIO 1 l Natumi'),(4,'ZESTAW 6X Napój sojowy bezglutenowy BIO 1 l Natumi'),(5,'Żurawina cała suszona 1kg'),(6,'Drożdże instant 500g'),(7,'Chrzan mielony 500g'),(8,'Chrzan mielony 100g'),(9,'STALKA EGGINTON DO OSTRZENIA NOŻY 10 cali'),(10,'Osłonka poliamidowa FI 95 bezbarwna 5 m'),(11,'Papryka gochugaru grys 400g'),(12,'Papryka gochugaru grys 100g'),(13,'ZESTAW 3x Daktyle suszone bez pestek 1kg'),(14,'Zestaw Stevia tabletki 300 szt. (4 PACK)'),(15,'Pestki dyni łuskane 1 kg'),(16,'BIO Cukier waniliowy 20g Amylon'),(17,'Cukier waniliowy z prawdziwą wanilią 3% 100g'),(18,'Cukier waniliowy z prawdziwą wanilią 3% 500g'),(19,'Mąka kokosowa 1 kg'),(20,'Mąka kokosowa 500g'),(21,'Proszek do pieczenia bezglutenowy 70g Balviten'),(22,'5 Ziaren do chleba z czarnuszką 500 g'),(23,'5 Ziaren do chleba z makiem 500 g'),(24,'Drożdże instant 100 g'),(25,'Drożdże instant 500 g'),(26,'Mąka gryczana 1 kg'),(27,'Mąka gryczana 500 g'),(28,'Mąka jaglana 1 kg'),(29,'Mąka jaglana 500 g'),(30,'Mąka migdałowa 1 kg'),(31,'Mąka migdałowa 500 g'),(32,'Mąka orkiszowa 1 kg'),(33,'Mąka orkiszowa 500 g'),(34,'Mąka owsiana 1 kg'),(35,'Mąka owsiana 500 g'),(36,'Mąka ryżowa 1 kg'),(37,'Mąka ryżowa 500 g'),(38,'Suchy zakwas żytni 250 g');
