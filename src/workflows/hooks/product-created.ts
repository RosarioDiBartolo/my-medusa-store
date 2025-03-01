import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { 
  Create3DFromProductWorkflowInput, 
  create3DFromProductWorkflow,
} from "../create-3d-from-product"

createProductsWorkflow.hooks.productsCreated(
	async ({ products, additional_data }, { container }) => {
    const workflow = create3DFromProductWorkflow(container)
    
    for (const product of products) {
      await workflow.run({
        input: {
          product,
          additional_data,
        } as Create3DFromProductWorkflowInput,
      })
    }
	}
)