-- CreateTable
CREATE TABLE `batch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `cost` DOUBLE NOT NULL,
    `desc` TEXT NULL,
    `product_id` INTEGER NOT NULL,
    `size_id` INTEGER NOT NULL,
    `code` VARCHAR(30) NOT NULL,

    INDEX `fk_batch_product1_idx`(`product_id`),
    INDEX `fk_batch_size1_idx`(`size_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `card_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card_no` INTEGER NOT NULL,
    `payment_method_id` INTEGER NOT NULL,

    INDEX `fk_card_details_payment_method1_idx`(`payment_method_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grn` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(0) NOT NULL,
    `total` DOUBLE NOT NULL,
    `total_qty` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `users_id` INTEGER NOT NULL,

    INDEX `fk_grn_supplier1_idx`(`supplier_id`),
    INDEX `fk_grn_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grn_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `cost` DOUBLE NOT NULL,
    `product_id` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `size_id` INTEGER NOT NULL,
    `desc` TEXT NULL,
    `product_type_id` INTEGER NOT NULL,
    `grn_id` INTEGER NOT NULL,

    INDEX `fk_grn_items_grn1_idx`(`grn_id`),
    INDEX `fk_grn_items_product_type1_idx`(`product_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` DOUBLE NOT NULL,
    `qty` DOUBLE NOT NULL,
    `datetime` DATETIME(0) NOT NULL,
    `discount` DOUBLE NOT NULL,
    `payment_method_id` INTEGER NOT NULL,
    `users_id` INTEGER NOT NULL,

    INDEX `fk_invoice_payment_method1_idx`(`payment_method_id`),
    INDEX `fk_invoice_users1_idx`(`users_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `cost` DOUBLE NOT NULL,
    `product_id` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `batch_id` INTEGER NOT NULL,
    `invoice_id` INTEGER NOT NULL,
    `product_type_id` INTEGER NOT NULL,

    INDEX `fk_grn_items_copy1_invoice1_idx`(`invoice_id`),
    INDEX `fk_grn_items_product_type1_idx`(`product_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mother_plant_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_method` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `price` DOUBLE NOT NULL,
    `desc` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pot_batch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qty` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `cost` DOUBLE NOT NULL,
    `desc` TEXT NULL,
    `pot_id` INTEGER NOT NULL,
    `pot_size_id` INTEGER NOT NULL,
    `code` VARCHAR(30) NOT NULL,

    INDEX `fk_pot_batch_pot1_idx`(`pot_id`),
    INDEX `fk_pot_batch_pot_size1_idx`(`pot_size_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pot_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `size` VARCHAR(100) NOT NULL,
    `short_key` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(70) NOT NULL,
    `desc` TEXT NULL,
    `mother_plant_type_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `isActive` BIT(1) NOT NULL DEFAULT b'0',

    INDEX `fk_product_category1_idx`(`category_id`),
    INDEX `fk_product_mother_plant_type1_idx`(`mother_plant_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `size` VARCHAR(100) NOT NULL,
    `short_key` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(100) NOT NULL,
    `company` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `mobile` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `isActive` BIT(1) NOT NULL,
    `status_id` INTEGER NOT NULL,
    `gender_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,

    INDEX `fk_supplier_city1_idx`(`city_id`),
    INDEX `fk_supplier_gender1_idx`(`gender_id`),
    INDEX `fk_supplier_status1_idx`(`status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(45) NOT NULL,
    `lname` VARCHAR(45) NOT NULL,
    `address` VARCHAR(100) NOT NULL,
    `nic` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `mobile` VARCHAR(20) NOT NULL,
    `p_img` TEXT NULL,
    `user_role_id` INTEGER NOT NULL,
    `gender_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `status_id` INTEGER NOT NULL,

    INDEX `fk_users_city1_idx`(`city_id`),
    INDEX `fk_users_gender1_idx`(`gender_id`),
    INDEX `fk_users_status1_idx`(`status_id`),
    INDEX `fk_users_user_role_idx`(`user_role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pot_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `pot_batch_id` INTEGER NOT NULL,

    INDEX `fk_pot_image_pot_batch1_idx`(`pot_batch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `batch_id` INTEGER NOT NULL,

    INDEX `fk_product_image_batch1_idx`(`batch_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
