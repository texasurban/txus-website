CREATE TABLE `cartInquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inquiryCode` varchar(32) NOT NULL,
	`idempotencyKey` varchar(128),
	`requestHash` varchar(64),
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerPhone` varchar(32),
	`notes` text,
	`itemsJson` text NOT NULL,
	`pricingVersion` varchar(64) NOT NULL,
	`pricingSnapshotJson` text,
	`totalAmount` varchar(24) NOT NULL,
	`fulfillment` varchar(32) NOT NULL DEFAULT 'local_pickup',
	`pickupAmount` varchar(16) NOT NULL DEFAULT '0.00',
	`notificationSent` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cartInquiries_id` PRIMARY KEY(`id`),
	CONSTRAINT `cartInquiries_inquiryCode_unique` UNIQUE(`inquiryCode`),
	CONSTRAINT `cartInquiries_idempotencyKey_unique` UNIQUE(`idempotencyKey`)
);
--> statement-breakpoint
CREATE TABLE `cartInquiryItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`inquiryId` int NOT NULL,
	`productId` varchar(64) NOT NULL,
	`quantity` int NOT NULL,
	`surfacing` int NOT NULL DEFAULT 0,
	`unitPrice` varchar(24) NOT NULL,
	`surfacingFee` varchar(16) NOT NULL,
	`lineTotal` varchar(24) NOT NULL,
	`boardFeet` varchar(32),
	`boardFootRateUsed` varchar(16),
	`pricingMethod` enum('board_foot','fixed','inquire') NOT NULL,
	`rateSource` varchar(16) NOT NULL,
	`pricingFormula` text NOT NULL,
	`pricingVersion` varchar(64) NOT NULL,
	`inventoryVersion` varchar(64) NOT NULL,
	`productSnapshotJson` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `cartInquiryItems_id` PRIMARY KEY(`id`)
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
	`boardFootRateOverride` varchar(16),
	`fixedPrice` varchar(16),
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
	`lengthIn` varchar(32),
	`widthMinIn` varchar(32),
	`widthMaxIn` varchar(32),
	`averageWidthIn` varchar(32),
	`thicknessIn` varchar(32),
	`boardFeet` varchar(32),
	`pricingMethodDefault` varchar(64),
	`sourcePrice` varchar(32),
	`location` varchar(128),
	`notes` text,
	`primaryImage` varchar(2048),
	`allImages` text,
	`galleryJson` text,
	`imageCount` int DEFAULT 0,
	`imageStatus` varchar(32) DEFAULT 'IMAGE_REVIEW',
	`publicListing` varchar(8) DEFAULT 'NO',
	`exclusionReason` text,
	`quantity` int NOT NULL DEFAULT 1,
	`inventoryVersion` varchar(64) NOT NULL,
	`status` varchar(64) DEFAULT 'available',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `speciesPricing` (
	`id` int AUTO_INCREMENT NOT NULL,
	`species` varchar(128) NOT NULL,
	`boardFootRate` varchar(16) NOT NULL DEFAULT '12.00',
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
	`oldRate` varchar(16),
	`newRate` varchar(16),
	`oldMethod` varchar(16),
	`newMethod` varchar(16),
	`changedBy` varchar(128) NOT NULL,
	`changeReason` text,
	`oldValueJson` text,
	`newValueJson` text,
	`changedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `speciesPricingHistory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `cartInquiryItems` ADD CONSTRAINT `cartInquiryItems_inquiryId_cartInquiries_id_fk` FOREIGN KEY (`inquiryId`) REFERENCES `cartInquiries`(`id`) ON DELETE no action ON UPDATE no action;