-- ===================================================
-- Customers Tables
-- ===================================================

CREATE TABLE IF NOT EXISTS `customer_identifier` (
  `customer_id` INT(11) NOT NULL AUTO_INCREMENT,
  `customer_email` VARCHAR(255) NOT NULL,
  `customer_phone_number` VARCHAR(255) NOT NULL,
  `customer_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE (`customer_email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer_info` (
  `customer_info_id` INT(11) NOT NULL AUTO_INCREMENT,
  `customer_id` INT(11) NOT NULL, 
  `customer_first_name` VARCHAR(255) NOT NULL,
  `customer_last_name` VARCHAR(255) NOT NULL,
  `active_customer_status` INT(11) NOT NULL,
  PRIMARY KEY (`customer_info_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer_vehicle_info` (
  `vehicle_id` INT(11) NOT NULL AUTO_INCREMENT,
  `customer_id` INT(11) NOT NULL, 
  `vehicle_year` INT(11) NOT NULL,
  `vehicle_make` VARCHAR(255) NOT NULL,
  `vehicle_model` VARCHAR(255) NOT NULL,
  `vehicle_type` VARCHAR(255) NOT NULL,
  `vehicle_mileage` INT(11) NOT NULL, 
  `vehicle_tag` VARCHAR(255) NOT NULL,
  `vehicle_serial` VARCHAR(255) NOT NULL,
  `vehicle_color` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`)
) ENGINE=InnoDB;


-- ===================================================
-- Company Tables
-- ===================================================

CREATE TABLE IF NOT EXISTS `company_roles` (
  `company_role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `company_role_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`company_role_id`),
  UNIQUE (`company_role_name`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `common_services` (
  `service_id` INT(11) NOT NULL AUTO_INCREMENT,
  `service_name` VARCHAR(255) NOT NULL,
  `Service_Price` INT(11) NOT NULL,
  `service_description` TEXT,
  `active` INT(11) NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB;


-- ===================================================
-- Employee Tables
-- ===================================================

CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` INT(11) NOT NULL AUTO_INCREMENT,
  `employee_email` VARCHAR(255) NOT NULL,
  `active_employee` INT(11) NOT NULL,
  `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `employee_image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE (`employee_email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_info` (
  `employee_info_id` INT(11) NOT NULL AUTO_INCREMENT,
  `employee_id` INT(11) NOT NULL,
  `employee_first_name` VARCHAR(255) NOT NULL,
  `employee_last_name` VARCHAR(255) NOT NULL,
  `employee_phone` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employee_info_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_pass` (
  `employee_pass_id` INT(11) NOT NULL AUTO_INCREMENT,
  `employee_id` INT(11) NOT NULL,
  `employee_password_hashed` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employee_pass_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_role` (
  `employee_role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `employee_id` INT(11) NOT NULL,
  `company_role_id` INT(11) NOT NULL,
  PRIMARY KEY (`employee_role_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`),
  FOREIGN KEY (`company_role_id`) REFERENCES `company_roles`(`company_role_id`)
) ENGINE=InnoDB;


-- ===================================================
-- Order Tables
-- ===================================================

CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` INT(11) NOT NULL AUTO_INCREMENT,
  `employee_id` INT(11) NOT NULL,
  `customer_id` INT(11) NOT NULL,
  `vehicle_id` INT(11) NOT NULL,
  `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `active_order` INT(11) NOT NULL,
  `order_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`), 
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`),
  FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info`(`vehicle_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `order_info` (
  `order_info_id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `order_total_price` INT(11) NOT NULL,
  `estimated_completion_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `completion_date` DATETIME,
  `additional_request` TEXT,
  `notes_for_internal_use` TEXT,
  `notes_for_customer` TEXT,
  `additional_requests_completed` INT(11) NOT NULL,
  PRIMARY KEY (`order_info_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `order_services` (
  `order_service_id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `service_id` INT(11) NOT NULL,
  `service_completed` INT(11) NOT NULL,
  PRIMARY KEY (`order_service_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`),
  FOREIGN KEY (`service_id`) REFERENCES `common_services`(`service_id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `order_status` (
  `order_status_id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` INT(11) NOT NULL,
  `order_status` INT(11) NOT NULL,
  PRIMARY KEY (`order_status_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`)
) ENGINE=InnoDB;


-- ===================================================
-- Garage Purchases Table
-- ===================================================

CREATE TABLE IF NOT EXISTS `garage_purchases` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(255) NOT NULL,
  `quantity` INT(11) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `purchase_date` DATE NOT NULL,
  `image_url` VARCHAR(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;


-- ===================================================
-- Initial Data Inserts
-- ===================================================

-- Insert Company Roles
INSERT INTO `company_roles` (`company_role_name`)
VALUES ('Employee'), ('Manager'), ('Admin');

-- Create the admin account
INSERT INTO `employee` (`employee_email`, `active_employee`, `added_date`, `employee_image`)
VALUES ('admin@admin.com', 1, CURRENT_TIMESTAMP, 'default_admin.png');

INSERT INTO `employee_info` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_phone`)
VALUES (1, 'Admin', 'Admin', '555-555-5555'); 

-- Password is 12345689 (hashed)
INSERT INTO `employee_pass` (`employee_id`, `employee_password_hashed`)
VALUES (1, '$2y$10$MCGJO/JzwvDqz1hpKpMJFOp1XfBadr/OtOv8mh60W/iK6Y9w6lx1q');

INSERT INTO `employee_role` (`employee_id`, `company_role_id`)
VALUES (1, 3);












-- -- Customers tables  
-- CREATE TABLE IF NOT EXISTS `customer_identifier` (
--   `customer_id` int(11) NOT NULL AUTO_INCREMENT,
--   `customer_email` varchar(255) NOT NULL,
--   `customer_phone_number` varchar(255) NOT NULL,
--   `customer_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   `customer_hash` varchar(255) NOT NULL,
  
--   PRIMARY KEY (customer_id),
--   UNIQUE (customer_email)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `customer_info` (
--   `customer_info_id` int(11) NOT NULL AUTO_INCREMENT,
--   `customer_id` int(11) NOT NULL, 
--   `customer_first_name` varchar(255) NOT NULL,
--   `customer_last_name` varchar(255) NOT NULL,
--   `active_customer_status` int(11) NOT NULL,
--   PRIMARY KEY (customer_info_id),
--   FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `customer_vehicle_info` (
--   `vehicle_id` int(11) NOT NULL AUTO_INCREMENT,
--   `customer_id` int(11) NOT NULL, 
--   `vehicle_year` int(11) NOT NULL,
--   `vehicle_make` varchar(255) NOT NULL,
--   `vehicle_model` varchar(255) NOT NULL,
--   `vehicle_type` varchar(255) NOT NULL,
--   `vehicle_mileage` int(11) NOT NULL, 
--   `vehicle_tag` varchar(255) NOT NULL,
--   `vehicle_serial` varchar(255) NOT NULL,
--   `vehicle_color` varchar(255) NOT NULL,
--   PRIMARY KEY (vehicle_id),
--   FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
-- ) ENGINE=InnoDB;

-- -- Company tables 
-- CREATE TABLE IF NOT EXISTS `company_roles` (
--   `company_role_id` int(11) NOT NULL AUTO_INCREMENT,
--   `company_role_name` varchar(255) NOT NULL,
--   PRIMARY KEY (company_role_id),
--   UNIQUE (company_role_name)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `common_services` (
--   `service_id` int(11) NOT NULL AUTO_INCREMENT,
--   `service_name` varchar(255) NOT NULL,
--   `Service_Price` int(11) NOT NULL,
--   `service_description` TEXT,
--   `active` int(11) NOT NULL,
--   PRIMARY KEY (service_id)
-- ) ENGINE=InnoDB;


-- -- Employee tables 
-- CREATE TABLE IF NOT EXISTS `employee` (
--   `employee_id` int(11) NOT NULL AUTO_INCREMENT,
--   `employee_email` varchar(255) NOT NULL,
--   `active_employee` int(11) NOT NULL,
--   `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   `employee_image` varchar(255) NOT NULL,
--   PRIMARY KEY (employee_id), 
--   UNIQUE (employee_email)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `employee_info` (
--   `employee_info_id` int(11) NOT NULL AUTO_INCREMENT,
--   `employee_id` int(11) NOT NULL,
--   `employee_first_name` varchar(255) NOT NULL,
--   `employee_last_name` varchar(255) NOT NULL,
--   `employee_phone` varchar(255) NOT NULL,
--   PRIMARY KEY (employee_info_id),
--   FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `employee_pass` (
--   `employee_pass_id` int(11) NOT NULL AUTO_INCREMENT,
--   `employee_id` int(11) NOT NULL,
--   `employee_password_hashed` varchar(255) NOT NULL,
--   PRIMARY KEY (employee_pass_id),
--   FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `employee_role` (
--   `employee_role_id` int(11) NOT NULL AUTO_INCREMENT,
--   `employee_id` int(11) NOT NULL,
--   `company_role_id` int(11) NOT NULL,
--   PRIMARY KEY (employee_role_id),
--   FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
--   FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
-- ) ENGINE=InnoDB;

-- -- Order tables  
-- CREATE TABLE IF NOT EXISTS `orders` (
--   `order_id` int(11) NOT NULL AUTO_INCREMENT,
--   `employee_id` int(11) NOT NULL,
--   `customer_id` int(11) NOT NULL,
--   `vehicle_id` int(11) NOT NULL,
--   `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
--   `active_order` int(11) NOT NULL,
--   `order_hash` varchar(255) NOT NULL,
--   PRIMARY KEY (order_id),
--   FOREIGN KEY (employee_id) REFERENCES employee(employee_id), 
--   FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
--   FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `order_info` (
--   `order_info_id` int(11) NOT NULL AUTO_INCREMENT,
--   `order_id` int(11) NOT NULL,
--   `order_total_price` int(11) NOT NULL,
--   `estimated_completion_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
--   `completion_date` DATETIME,
--   `additional_request` TEXT,
--   `notes_for_internal_use` TEXT,
--   `notes_for_customer` TEXT,
--   `additional_requests_completed` int(11) NOT NULL,
--   PRIMARY KEY (order_info_id),
--   FOREIGN KEY (order_id) REFERENCES orders(order_id)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `order_services` (
--   `order_service_id` int(11) NOT NULL AUTO_INCREMENT,
--   `order_id` int(11) NOT NULL,
--   `service_id` int(11) NOT NULL,
--   `service_completed` int(11) NOT NULL,
--   PRIMARY KEY (order_service_id),
--   FOREIGN KEY (order_id) REFERENCES orders(order_id),
--   FOREIGN KEY (service_id) REFERENCES common_services(service_id)
-- ) ENGINE=InnoDB;

-- CREATE TABLE IF NOT EXISTS `order_status` (
--   `order_status_id` int(11) NOT NULL AUTO_INCREMENT,
--   `order_id` int(11) NOT NULL,
--   `order_status` int(11) NOT NULL,
--   PRIMARY KEY (order_status_id),
--   FOREIGN KEY (order_id) REFERENCES orders(order_id)
-- ) ENGINE=InnoDB;

-- -- Garage Purchases table
-- CREATE TABLE IF NOT EXISTS `garage_purchases` (
--   `id` int(11) NOT NULL AUTO_INCREMENT,
--   `item_name` varchar(255) NOT NULL,
--   `quantity` int(11) NOT NULL,
--   `price` decimal(10, 2) NOT NULL,
--   `purchase_date` DATE NOT NULL,
--   `image_url` varchar(255),
--   PRIMARY KEY (id)
-- ) ENGINE=InnoDB;

-- -- Add the roles to the database 
-- INSERT INTO company_roles (company_role_name)
-- VALUES ('Employee'), ('Manager'), ('Admin');

-- -- This is the admin account 
-- INSERT INTO employee (employee_email, active_employee, added_date)
-- VALUES ('admin@admin.com', 1, CURRENT_TIMESTAMP);

-- INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
-- VALUES (1, 'Admin', 'Admin', 555-555-5555); 

-- -- Password is 123456
-- INSERT INTO employee_pass (employee_id, employee_password_hashed)
-- VALUES (1, '$2b$10$ceYuf8esgIge0dnr01SGO.Q8Qhn.c4q4kTg.TS4A40.oj0aSwbhG2');  

-- INSERT INTO employee_role (employee_id, company_role_id)
-- VALUES (1, 3); 