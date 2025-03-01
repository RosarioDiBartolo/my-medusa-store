import { defineLink } from "@medusajs/framework/utils";
import ThreeDimensionalModule from "../modules/three_dimensional_product";
import ProductModule from "@medusajs/medusa/product";

export default defineLink(
  ProductModule.linkable.product,
  ThreeDimensionalModule.linkable.threeDimensionalProduct, 
 
);
