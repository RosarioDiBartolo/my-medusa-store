import { Migration } from '@mikro-orm/migrations';

export class Migration20250301061223 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "three_dimensional_products" ("product_id" text not null, "three_dimensional_assets" text[] not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "three_dimensional_products_pkey" primary key ("product_id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_three_dimensional_products_deleted_at" ON "three_dimensional_products" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "three_dimensional_products" cascade;`);
  }

}
