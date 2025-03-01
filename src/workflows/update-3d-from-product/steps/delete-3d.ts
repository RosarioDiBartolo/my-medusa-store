import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import ThreeDimensionalProduct  from "../../../modules/three_dimensional_product/models/three_dimensional_product"
import { InferTypeOf } from "@medusajs/framework/types"
import ThreeDimService from "../../../modules/three_dimensional_product/service"
import { THREE_DIMENSIONAL_MODULE} from "../../../modules/three_dimensional_product"

type Delete3DStepInput = {
  ThreeDimProduct: InferTypeOf<typeof ThreeDimensionalProduct>
}

export const delete3DStep = createStep(
  "delete-three-dim-product",
  async ({ ThreeDimProduct }: Delete3DStepInput, { container }) => {
    const ThreeDimService: ThreeDimService = container.resolve(
      THREE_DIMENSIONAL_MODULE
    )

    await ThreeDimService.deleteThreeDimensionalProducts(ThreeDimProduct.id)

    return new StepResponse(ThreeDimProduct, ThreeDimProduct)
  },
  async (ThreeDimProduct, { container }) => {
    const ThreeDimService: ThreeDimService = container.resolve(
      THREE_DIMENSIONAL_MODULE
    )
    if (ThreeDimProduct){

        await ThreeDimService.createThreeDimensionalProducts(ThreeDimProduct)
    }
 
  }
)