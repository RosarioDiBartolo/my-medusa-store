import { createWorkflow, transform, when, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { ProductDTO } from "@medusajs/framework/types"
import { createRemoteLinkStep } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"
import { THREE_DIMENSIONAL_MODULE } from "../../modules/three_dimensional_product"
import { create3DStep } from "./steps/create-3d"

export type Create3DFromProductWorkflowInput = {
  product: ProductDTO
  additional_data?: {
    three_dimensional_assets?: string[]
  }
}

export const create3DFromProductWorkflow = createWorkflow(
  "create-3d-from-product",
  (input: Create3DFromProductWorkflowInput) => {
    const assets = transform(
      { input },
      (data) => data.input.additional_data?.three_dimensional_assets || []
    )

    const ThreeDimProduct = create3DStep({
      three_dimensional_assets: assets,
    })

    when(({ ThreeDimProduct }), ({ ThreeDimProduct }) => !!ThreeDimProduct)
      .then(() => {
        createRemoteLinkStep([
          {
            [Modules.PRODUCT]: {
              product_id: input.product.id,
            },
            [THREE_DIMENSIONAL_MODULE]: {
              three_dimensional_product_id: ThreeDimProduct.id,
            },
          },
        ])
      })

    return new WorkflowResponse({
      ThreeDimProduct,
    })
  }
)
