export default {
    "/auth/login": {
        summary: "Login",
        post: {
            summary: "Login",
            description: "Faz o login e retorna o token",
            tags: ["Auth"],
            requestBody: {
                description: "Login data",
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                username: {
                                    type: "string",
                                    summary: "username",
                                    example: "teste",
                                },
                                password: {
                                    type: "string",
                                    summary: "user password",
                                    example: "123123",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Success",
                    content: {
                        "application/json": {
                            example: {
                                ok: true,
                            },
                        },
                    },
                },
            },
        },
    },
};
