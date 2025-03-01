import ThreeDimensionalModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const THREE_DIMENSIONAL_MODULE = "three_dimensional_products"

export default Module( THREE_DIMENSIONAL_MODULE, {
  service: ThreeDimensionalModuleService,
})