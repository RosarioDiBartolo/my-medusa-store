import { MedusaService } from "@medusajs/framework/utils"
import ThreeDimensionalProduct from "./models/three_dimensional_product"

class ThreeDimensionalProductService extends MedusaService({
  ThreeDimensionalProduct,
}) {
  // You can add methods to interact with the three_dimensional_product model here.
}

export default ThreeDimensionalProductService
