import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import ThreeDimModuleService from "../../../modules/three_dimensional_product/service"
import { THREE_DIMENSIONAL_MODULE } from "../../../modules/three_dimensional_product"

type Create3DStepInput = {
    three_dimensional_assets?: string[]
}

export const create3DStep = createStep(
  "create-3d-step",
  async (data: Create3DStepInput, { container }) => {
    if (!data.three_dimensional_assets) {
      return
    }

    const threeDimModuleService: ThreeDimModuleService = container.resolve(
      THREE_DIMENSIONAL_MODULE
    )

    const ThreeDimProduct = await threeDimModuleService.createThreeDimensionalProducts(data)

    return new StepResponse(ThreeDimProduct, ThreeDimProduct)
  },
  async (ThreeDimProduct, { container }) => {
    const threeDimModuleService: ThreeDimModuleService = container.resolve(
      THREE_DIMENSIONAL_MODULE
    )

    if (ThreeDimProduct){
        await threeDimModuleService.deleteThreeDimensionalProducts(ThreeDimProduct.id)

    }
   }
)