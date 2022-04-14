export default {
    "/category": {
        summary: "Category GET and POST routes",
        get: {
            summary: "List categories",
            description: "List all saved categories",
            tags: ["Category"],
            parameters: [
                {
                    name: "filter",
                    in: "query",
                    description: "Category filter",
                    required: false,
                    example: "category1",
                },
            ],
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            example: {
                                ok: true,
                                data: [{ id: 10, name: "category 1" }],
                            },
                        },
                    },
                },
            },
        },
        post: {
            summary: "Create category",
            description: "Create a new category",
            tags: ["Category"],
            requestBody: {
                description: "Category data",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/category",
                        },
                    },
                },
            },
            responses: {
                200: {
                    $ref: "#/components/responses/simple200",
                },
            },
        },
    },
    "/category/{Id}": {
        summary: "Category PUT routes",
        put: {
            summary: "Update category",
            description: "Update category data",
            parameters: [
                {
                    name: "Id",
                    in: "path",
                    description: "Category ID",
                    required: true,
                    example: "6e14bd69-6e6c-4893-8efa-2a86a43048c2",
                    schema: {
                        type: "string",
                        summary: "UUID referente a categoria",
                    },
                },
            ],
            requestBody: {
                description: "Category data",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/category",
                        },
                    },
                },
            },
            responses: {
                200: {
                    $ref: "#/components/responses/simple200",
                },
            },
        },
    },
};
