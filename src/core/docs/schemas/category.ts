export default {
    type: "object",
    properties: {
        nome: {
            summary: "Category name",
            type: "string",
            example: "Category 1",
        },
        descricao: {
            summary: "Category description",
            type: "string",
            example: "Descricao 1",
        },
        tag: {
            summary: "Category tag",
            type: "integer",
            example: 1,
        },
    },
};
