import { gql } from "@apollo/client";
/**
 * Возвращает GraphQL запрос на категории
 */
export const QUERY_CATEGORY_LIST = gql`
    query GetCategoryList($hideEmpty: Boolean!) {
        productCategories(where: {hideEmpty: $hideEmpty}) {
            nodes {
                name
                productCategoryId
                image {
                    mediaDetails {
                        file
                    }
                }
            }
        }
    }`;

/**
 * Возвращает GraphQL запрос на список товаров
 * @param {number} categoryId - id категории
 */
export const QUERY_PRODUCT_LIST = gql`
    query GetProductListQuery($categoryId: Int!) {
        products(where: {categoryId: $categoryId}) {
            nodes {
                databaseId
                name
                description
                image {
                    mediaDetails {
                        file
                    }
                }
                galleryImages {
                    nodes {
                        mediaDetails {
                            file
                        }
                    }
                }
                ... on VariableProduct {
                    variations {
                        nodes {
                            price
                            databaseId
                            name
                        }
                    }
                    attributes {
                        nodes {
                            attributeId
                            name
                            options
                        }
                    }
                }
                ... on SimpleProduct {
                    price
                }
            }
        }
    }`;

/**
 * Возвращает GraphQL мутацию для регистрации пользователя
 * @param {string} email - email пользователя
 * @param {string} username - имя пользователя
 * @param {string} password - пароль пользователя
 */
export const getUserRegisterQuery = (uuid, email, username, password) => {

    return JSON.stringify({
        query: `
            mutation RegisterUser {
                registerUser(
                input: {
                    clientMutationId: "${uuid}",
                    username: "${username}",
                    password: "${password}",
                    email: "${email}"
                }) {
                    user {
                        jwtAuthToken
                        jwtRefreshToken
                    }
                }
            }
        `,
    })
};

/**
 * Возвращает GraphQL мутацию для входа
 * @param {string} uuid - uuid пользователя
 * @param {string} username - имя пользователя
 * @param {string} password - пароль пользователя
 */
export const getUserLoginQuery = (uuid, username, password) => {
    return JSON.stringify({
        query: `
            mutation LoginUser {
                login( input: {
                    clientMutationId: "${uuid}",
                    username: "${username}",
                    password: "${password}"
                }) {
                    authToken
                    user {
                        id
                        name
                    }
                }
            }
        `,
    })
};