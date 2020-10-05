
export const getCategoryListQuery = () => {
    return JSON.stringify({
        query: `
            {
                productCategories(where: {hideEmpty: true}) {
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
            }
        `,
    });
};

export const getProductListQuery = (id) => {
    return JSON.stringify({
        query: `
            {
                products(where: {categoryId: ${id}}) {
                    nodes {
                        productId
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
                              variationId
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
            }
        `,
    });
};