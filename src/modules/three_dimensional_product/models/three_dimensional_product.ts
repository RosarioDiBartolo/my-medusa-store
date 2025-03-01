import { model } from "@medusajs/framework/utils"

const ThreeDimensionalProductModel = model.define("three_dimensional_product", {
  id: model.id().primaryKey(),
  three_dimensional_assets: model.array(), // expects an array of asset URLs/IDs
})

export default ThreeDimensionalProductModel
