CREATE TABLE `cartInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inquiryCode` varchar(32) NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerPhone` varchar(32),
	`notes` text,
	`itemsJson` text NOT NULL,
	`pricingVersion` varchar(64),
	`pricingSnapshotJson` text,
	`totalAmount` varchar(16),
	`fulfillment` varchar(32) DEFAULT 'local_pickup',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cartInquiries_id` PRIMARY KEY(`id`),
	CONSTRAINT `cartInquiries_inquiryCode_unique` UNIQUE(`inquiryCode`)
);
--> statement-breakpoint
CREATE TABLE `pricingMeta` (
	`id` int AUTO_INCREMENT NOT NULL,
	`metaKey` varchar(64) NOT NULL,
	`metaValue` varchar(255) NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pricingMeta_id` PRIMARY KEY(`id`),
	CONSTRAINT `pricingMeta_metaKey_unique` UNIQUE(`metaKey`)
);
--> statement-breakpoint
CREATE TABLE `productPricingOverrides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` varchar(64) NOT NULL,
	`pricingMethod` enum('board_foot','fixed','inquire') NOT NULL DEFAULT 'board_foot',
	`boardFootRateOverride` varchar(10),
	`fixedPrice` varchar(10),
	`overrideReason` text,
	`active` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `productPricingOverrides_id` PRIMARY KEY(`id`),
	CONSTRAINT `productPricingOverrides_productId_unique` UNIQUE(`productId`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` varchar(64) NOT NULL,
	`category` varchar(64) NOT NULL,
	`species` varchar(128) NOT NULL,
	`lengthIn` varchar(16),
	`widthMinIn` varchar(16),
	`widthMaxIn` varchar(16),
	`averageWidthIn` varchar(16),
	`thicknessIn` varchar(16),
	`boardFeet` varchar(16),
	`pricingMethodDefault` varchar(64),
	`sourcePrice` varchar(16),
	`location` varchar(128),
	`notes` text,
	`primaryImage` varchar(255),
	`allImages` text,
	`imageCount` int DEFAULT 0,
	`imageStatus` varchar(32) DEFAULT 'IMAGE_LINKED',
	`publicListing` varchar(8) DEFAULT 'YES',
	`status` varchar(64) DEFAULT 'available',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `speciesPricing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`species` varchar(128) NOT NULL,
	`boardFootRate` varchar(10) NOT NULL DEFAULT '12.00',
	`pricingMethod` enum('board_foot','fixed','inquire') NOT NULL DEFAULT 'board_foot',
	`status` enum('active','inactive') NOT NULL DEFAULT 'active',
	`effectiveDate` varchar(32),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `speciesPricing_id` PRIMARY KEY(`id`),
	CONSTRAINT `speciesPricing_species_unique` UNIQUE(`species`)
);
--> statement-breakpoint
CREATE TABLE `speciesPricingHistory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`speciesPricingId` int,
	`species` varchar(128) NOT NULL,
	`oldRate` varchar(10),
	`newRate` varchar(10),
	`oldMethod` varchar(16),
	`newMethod` varchar(16),
	`changedBy` varchar(128),
	`changeReason` text,
	`changedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `speciesPricingHistory_id` PRIMARY KEY(`id`)
);
