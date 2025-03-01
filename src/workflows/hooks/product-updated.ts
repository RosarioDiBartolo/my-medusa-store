import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { 
  Update3DFromProductStepInput, 
  update3DFromProductWorkflow,
} from "../update-3d-from-product"

updateProductsWorkflow.hooks.productsUpdated(
	async ({ products, additional_data }, { container }) => {
    const workflow = update3DFromProductWorkflow(container)
    
    for (const product of products) {
      await workflow.run({
        input: {
          product,
          additional_data,
        } as Update3DFromProductStepInput,
      })
    }
	}
)