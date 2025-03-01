import { defineMiddlewares } from "@medusajs/framework/http"
import { z } from "zod"

export default defineMiddlewares({
  routes: [
    {
      method: "POST",
      matcher: "/admin/products",
      additionalDataValidator: {
        three_dimensional_assets: z.array(z.string()),
      },
    },
    {
      method: "POST",
      matcher: "/admin/products/:id",
      additionalDataValidator: {
        three_dimensional_assets: z.array(z.string()),
      },
    },

  ],
})