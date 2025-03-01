import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import ThreeDimService from "../../../modules/three_dimensional_products/service"
import { THREE_DIMENSIONAL_MODULE} from "../../../modules/three_dimensional_products"

type CreateCustomStepInput = {
  custom_name?: string
}

export const createCustomStep = createStep(
  "create-custom",
  async (data: CreateCustomStepInput, { container }) => {
    if (!data.custom_name) {
      return
    }

    const ThreeDimModuleService: ThreeDimService = container.resolve(
        THREE_DIMENSIONAL_MODULE
    )

    const ThreeDimAssets =   []

    return new StepResponse(ThreeDimAssets, ThreeDimAssets)
  },
  async (custom, { container }) => {
    const ThreeDimModuleService: ThreeDimService = container.resolve(
      THREE_DIMENSIONAL_MODULE
    )

    await ThreeDimModuleService.deleteCustoms(custom.id)
  }
)