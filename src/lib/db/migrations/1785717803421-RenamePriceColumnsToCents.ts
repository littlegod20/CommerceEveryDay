import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePriceColumnsToCents1785717803421 implements MigrationInterface {
    name = 'RenamePriceColumnsToCents1785717803421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "price_in_kobo" TO "price_in_cents"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "total_in_kobo" TO "total_in_cents"`);
        await queryRunner.query(`ALTER TABLE "order_items" RENAME COLUMN "price_in_kobo_at_purchase" TO "price_in_cents_at_purchase"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" RENAME COLUMN "price_in_cents_at_purchase" TO "price_in_kobo_at_purchase"`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "total_in_cents" TO "total_in_kobo"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "price_in_cents" TO "price_in_kobo"`);
    }

}
