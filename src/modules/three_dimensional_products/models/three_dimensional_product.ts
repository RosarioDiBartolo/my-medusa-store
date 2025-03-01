import { model } from "@medusajs/framework/utils"

const tbl_three_dimensional_products = model.define("three_dimensional_products", {
  product_id: model.id().primaryKey(),
  three_dimensional_assets: model.array(),
})

export default tbl_three_dimensional_products
