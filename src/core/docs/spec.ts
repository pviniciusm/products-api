import categorySchema from "./schemas/category";
import categoryPaths from "./paths/category.paths";

export default {
    openapi: "3.0.0",
    info: {
        title: "Products API - JS",
        description: "This is the official documentation of Products API",
        version: "1.0.0",
        contact: {
            name: "Samuel Addams",
            email: "samuel@addams.com",
        },
    },
    tags: [
        {
            name: "Category",
            description: "Category routes",
        },
    ],
    components: {
        schemas: {
            category: categorySchema,
            returnOk: {
                type: "object",
                properties: {
                    ok: {
                        type: "boolean",
                        summary: "Indica se o retorno foi ok",
                    },
                },
            },
        },
        responses: {
            simple200: {
                description: "Success",
                content: {
                    "application/json": {
                        example: {
                            ok: true,
                        },
                        schema: {
                            $ref: "#/components/schemas/returnOk",
                        },
                    },
                },
            },
        },
    },
    paths: {
        ...categoryPaths,
    },
};
