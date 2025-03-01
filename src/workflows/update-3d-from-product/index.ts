import { ProductDTO } from "@medusajs/framework/types";
import {
  createWorkflow,
  when,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createRemoteLinkStep,
  dismissRemoteLinkStep,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows";
import { Modules } from "@medusajs/framework/utils";
import { THREE_DIMENSIONAL_MODULE } from "../../modules/three_dimensional_product";
import { delete3DStep } from "./steps/delete-3d";
import { update3DStep } from "./steps/update-3d";
import { create3DStep } from "../create-3d-from-product/steps/create-3d";

export type Update3DFromProductStepInput = {
  product: ProductDTO;
  additional_data?: {
    three_dimensional_assets?: string[];
  };
};

export const update3DFromProductWorkflow = createWorkflow(
  "update-three-dimensional-from-product",
  (input: Update3DFromProductStepInput) => {
    const { data: products } = useQueryGraphStep({
      entity: "product",
      fields: ["three_dimensional_product.*"],
      filters: {
        id: input.product.id,
      },
    });

    const created = when(
      "create-product-three-dimensional-link",
      {
        input,
        products,
      },
      (data) =>
        !data.products[0].three_dimensional_product &&
        !data.input.additional_data?.three_dimensional_assets
    ).then(() => {
      const ThreeDimProduct = create3DStep({
        three_dimensional_assets:
          input.additional_data?.three_dimensional_assets,
      });

      createRemoteLinkStep([
        {
          [Modules.PRODUCT]: {
            product_id: input.product.id,
          },
          [THREE_DIMENSIONAL_MODULE]: {
            three_dimensional_product_id: ThreeDimProduct.id,
          },
        },
      ]);

      return ThreeDimProduct;
    });

    const deleted = when(
      "delete-product-3d-link", 
      {
        input,
        products,
      }, (data) => 
        data.products[0].three_dimensional_product !== null  && (
          data.input.additional_data?.three_dimensional_assets === null || 
          data.input.additional_data?.three_dimensional_assets?.length === 0
        )
    )
    .then(() => {
      
      delete3DStep({
        ThreeDimProduct: products[0].three_dimensional_product ,
      })
    
      dismissRemoteLinkStep({
        [THREE_DIMENSIONAL_MODULE]: {
          product_id: products[0].three_dimensional_product.id,
        },
      })
    
      return products[0].three_dimensional_product.id
    })
    
    const updated = when({
      input,
      products,
    }, (data) => data.products[0].three_dimensional_product && (
      data.input.additional_data?.three_dimensional_assets === null || 
      data.input.additional_data?.three_dimensional_assets?.length === 0
    ))
    .then(() => {
      return update3DStep({
        id: products[0].three_dimensional_product.id,
        three_dimensional_assets: input.additional_data?.three_dimensional_assets || [],
      })
    })
    
    return new WorkflowResponse({
      created,
      updated,
      deleted,
    })  }
);
