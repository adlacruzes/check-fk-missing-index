CREATE TABLE table1
(
  id serial PRIMARY KEY
);

CREATE TABLE table2
(
  id      serial PRIMARY KEY,
  table1_id INT NOT NULL,
  FOREIGN KEY (table1_id)
    REFERENCES table1 (id)
);

CREATE TABLE table3
(
  id serial PRIMARY KEY
);

CREATE TABLE table4
(
  id        serial PRIMARY KEY,
  table3_id INT NOT NULL,
  FOREIGN KEY (table3_id)
    REFERENCES table3 (id)
);
