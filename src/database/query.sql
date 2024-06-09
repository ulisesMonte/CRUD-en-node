CREATE DATABaSE Crud;

use Crud;

CREATE TABLE personas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(50) not null,
    lastname VARCHAR(50) NOT NULL,
    age int
)

SELECT *FROM personas 