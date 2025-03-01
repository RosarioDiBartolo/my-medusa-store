import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { THREE_DIMENSIONAL_MODULE } from "../../../modules/three_dimensional_product"
import ThreeDimModuleService from "../../../modules/three_dimensional_product/service"

type Update3DInput = {
  id: string
  three_dimensional_assets: string[]
}

export const update3DStep = createStep(
  "update-3D-step",
  async ({ id, three_dimensional_assets }: Update3DInput, { container }) => {
    const ThreeDimModuleService: ThreeDimModuleService = container.resolve(
      THREE_DIMENSIONAL_MODULE
    )

    const prevData = await ThreeDimModuleService.retrieveThreeDimensionalProduct(id)

    const new_product = await ThreeDimModuleService.updateThreeDimensionalProducts({
      id,
      three_dimensional_assets ,
    })

    return new StepResponse(new_product, prevData)
  },
  async (prevData, { container }) => {
    const ThreeDimModuleService: ThreeDimModuleService = container.resolve(
      THREE_DIMENSIONAL_MODULE
    )

    if (prevData){
      await ThreeDimModuleService.updateThreeDimensionalProducts(prevData)

    }
  }
)