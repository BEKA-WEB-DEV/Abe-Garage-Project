-- ============================================
-- Customers Tables
-- ============================================
CREATE TABLE IF NOT EXISTS `customer_identifier` (
  `customer_id` VARCHAR(50) NOT NULL,  
  `customer_email` VARCHAR(255) NOT NULL,
  `customer_phone_number` VARCHAR(255) NOT NULL,
  `customer_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE (`customer_email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer_info` (
  `customer_info_id` INT(11) NOT NULL AUTO_INCREMENT,
  `customer_id` VARCHAR(50) NOT NULL,
  `customer_first_name` VARCHAR(255) NOT NULL,
  `customer_last_name` VARCHAR(255) NOT NULL,
  `active_customer_status` INT(11) NOT NULL,
  PRIMARY KEY (`customer_info_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer_vehicle_info` (
  `vehicle_id` VARCHAR(50) NOT NULL,  
  `customer_id` VARCHAR(50) NOT NULL,
  `vehicle_year` INT(11) NOT NULL,
  `vehicle_make` VARCHAR(255) NOT NULL,
  `vehicle_model` VARCHAR(255) NOT NULL,
  `vehicle_type` VARCHAR(255) NOT NULL,
  `vehicle_mileage` INT(11) NOT NULL,
  `vehicle_tag` VARCHAR(255) NOT NULL,
  `vehicle_serial` VARCHAR(255) NOT NULL,
  `vehicle_color` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- Company Tables
-- ============================================
CREATE TABLE IF NOT EXISTS `company_roles` (
  `company_role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `company_role_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`company_role_id`),
  UNIQUE (`company_role_name`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `common_services` (
  `service_id` VARCHAR(50) NOT NULL,  
  `service_name` VARCHAR(255) NOT NULL,
  `service_description` TEXT,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB;

-- ============================================
-- Employee Tables
-- ============================================
CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` VARCHAR(50) NOT NULL,  
  `employee_email` VARCHAR(255) NOT NULL,
  `active_employee` INT(11) NOT NULL,
  `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  UNIQUE (`employee_email`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_info` (
  `employee_info_id` INT(11) NOT NULL AUTO_INCREMENT,
  `employee_id` VARCHAR(50) NOT NULL,
  `employee_first_name` VARCHAR(255) NOT NULL,
  `employee_last_name` VARCHAR(255) NOT NULL,
  `employee_phone` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employee_info_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_pass` (
  `employee_pass_id` INT(11) NOT NULL AUTO_INCREMENT,
  `employee_id` VARCHAR(50) NOT NULL,
  `employee_password_hashed` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`employee_pass_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_role` (
  `employee_role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `employee_id` VARCHAR(50) NOT NULL,
  `company_role_id` INT(11) NOT NULL,
  PRIMARY KEY (`employee_role_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE,
  FOREIGN KEY (`company_role_id`) REFERENCES `company_roles`(`company_role_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- Order Tables
-- ============================================
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` VARCHAR(50) NOT NULL,  
  `employee_id` VARCHAR(50) NOT NULL,
  `customer_id` VARCHAR(50) NOT NULL,
  `vehicle_id` VARCHAR(50) NOT NULL,
  `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `active_order` INT(11) NOT NULL,
  `order_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`) ON DELETE CASCADE,
  FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info`(`vehicle_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `order_info` (
  `order_info_id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_id` VARCHAR(50) NOT NULL,
  `order_total_price` INT(11) NOT NULL,
  `estimated_completion_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `completion_date` DATETIME,
  `additional_request` TEXT,
  `notes_for_internal_use` TEXT,
  `notes_for_customer` TEXT,
  `additional_requests_completed` INT(11) NOT NULL,
  PRIMARY KEY (`order_info_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- Insert Initial Data
-- ============================================
-- Add the roles to the database for the company 
INSERT IGNORE INTO company_roles (company_role_name)
VALUES ('Employee'), ('Manager'), ('Admin');

-- Generate a unique employee ID, e.g., 'EMP001'
INSERT INTO employee (employee_id, employee_email, active_employee, added_date)
VALUES ('EMP001', 'admin@admin.com', 1, CURRENT_TIMESTAMP);

-- Insert employee_info with the same employee_id
INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES ('EMP001', 'Admin', 'Admin', '555-555-5555');

-- Password is 123456789
INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES ('EMP001', '$2b$10$S2EF.ttUrbaOwiTozz2PaeN3Lz6r4ehBxKezwHfYqWBXnjxm6VQSq');

-- Assign a role to the employee
INSERT INTO employee_role (employee_id, company_role_id)
VALUES ('EMP001', 3);
