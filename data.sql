INSERT INTO tipodocs VALUES(1, 'CEDULA DE CIUDADANIA');
INSERT INTO tipodocs VALUES(2, 'NUMERO UNICO DE INDENTIDAD PERSONAL');
INSERT INTO tipodocs VALUES(3, 'NIT');
INSERT INTO tipodocs VALUES(4, 'CEDULA DE EXTRANJERIA');
INSERT INTO tipodocs VALUES(5, 'PASE DIPLOMATICO');
INSERT INTO tipodocs VALUES(6, 'TARJETA DE IDENTIDAD');
INSERT INTO tipodocs VALUES(7, 'REGISTRO CIVIL');
INSERT INTO tipodocs VALUES(8, 'TARJETA DE EXTRANJERIA');
INSERT INTO tipodocs VALUES(9, 'PASAPORTE');

INSERT INTO users (id,tipodoc_id,firstName,secondName,firstLastName,secondLastName,email,celular,birthdate,gender,active) VALUES(88249432,1,'FABIO','ANTONIO', 'ROJAS', 'MARTHA', 'fabiorojas7@gmail.com', '3183895020', '1981-01-09', 'M', 1);

INSERT INTO auths(user_id, username, password) VALUES(199,'hackchan','f62856far');