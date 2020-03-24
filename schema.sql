CREATE TABLE `tipodocs` (
  `tipodoc_id` int unsigned NOT NULL AUTO_INCREMENT,
  `tipodoc_nom` varchar(80) NOT NULL,
  CONSTRAINT tipodoc_tipodoc_id_PK PRIMARY KEY(tipodoc_id)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=UTF8MB4;


CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `id` int  unsigned Not NULL,
  `tipodoc_id` int unsigned NOT NULL,
  `firstName` varchar(50) NOT NUll,
  `secondName`varchar(50) NOT NULL,
  `firstLastName` varchar(50) NOT NULL,
  `secondLastName` varchar(50) NOT NULL,
  `email`   varchar(100) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT users_user_id_PK PRIMARY KEY(`user_id`),
  CONSTRAINT users_id_UK UNIQUE KEY (`id`),
  CONSTRAINT users_email_UK UNIQUE KEY (`email`),
  CONSTRAINT users_celular_UK UNIQUE KEY (`celular`),
  CONSTRAINT users_tipodoc_id_FK FOREIGN KEY(`tipodoc_id`) REFERENCES  tipodocs(`tipodoc_id`)
)ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=UTF8MB4;


CREATE TABLE `auths` (
  `user_id` int unsigned NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  CONSTRAINT auths_user_id_PK PRIMARY KEY(`user_id`),
  CONSTRAINT auths_user_id_FK FOREIGN KEY(`user_id`) REFERENCES  users(`user_id`),
  CONSTRAINT users_username_UK UNIQUE KEY (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=UTF8MB4;


CREATE TABLE `posts`(
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `title` varchar(60) NOT NULL,
  `text` text NOT NULL,
  `image` varchar(255),
  `category` varchar(40),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT posts_post_id_PK PRIMARY KEY(`post_id`),
  CONSTRAINT posts_user_id_FK FOREIGN KEY(`user_id`) REFERENCES  users(`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `followers` (
  `user_to`   int unsigned NOT NULL,
  `user_from` int unsigned NOT NULL,
  `active`    boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT followers_user_to_FK FOREIGN KEY(`user_to`) REFERENCES  users(`user_id`),
  CONSTRAINT followers_user_from_FK FOREIGN KEY(`user_from`) REFERENCES  users(`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `likes` (
  `post_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT likes_post_id_FK FOREIGN KEY(`post_id`) REFERENCES  posts(`post_id`),
  CONSTRAINT likes_user_id_FK FOREIGN KEY(`user_id`) REFERENCES  users(`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=UTF8MB4;
