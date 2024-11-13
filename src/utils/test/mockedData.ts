export const mockedAd = {
    id: "ad-1",
    title: "Anúncio Mock",
    description: "Anúncio mock, criado para testes.",
    urlBanner: "https://mock.jpg",
    type: 2,
    userId: "user-1",
    userName: "Person_mock",
    completeName: "Mock Person",
    userEmail: "personmock@gmail.com",
    categoryId: "category-1",
    categoryDescription: "Desenvolvimento Web",
    advertisementRate: 0.13,
    createdAt: "2024-11-11T21:13:29.460539",
    price: 100,
    status: 1,
    numberOfSales: 0,
    itemAdvertisements: [],
    isActive: true,
};

export const mockedAd2 = {
    id: "ad-2",
    title: "Anúncio Mock Dinâmico",
    description: "Anúncio mock dinâmico, criado para testes.",
    urlBanner: "https://dynamic-mock.jpg",
    type: 2,
    userId: "user-1",
    userName: "Person_mock",
    completeName: "Mock Person",
    userEmail: "personmock@gmail.com",
    categoryId: "category-2",
    categoryDescription: "Design Digital",
    advertisementRate: 0.13,
    createdAt: "2024-11-11T21:13:29.460539",
    price: 0,
    status: 1,
    numberOfSales: 0,
    itemAdvertisements: [
        {
            name: "Logo Mock",
            price: 100,
        },
        {
            name: "Card Mock",
            price: 200,
        },
    ],
    isActive: true,
};

export const mockedAds = [mockedAd, mockedAd2]

export const mockedUser = {
    id: "user-1",
    completeName: "Mock Person",
    userName: "Person_mock",
    email: "personmock@gmail.com",
    isActive: true
};


export const mockedContextData = {
    advertisements: mockedAds,
    isAdmin: false,
    isLoading: false,
    setAdvertisements: jest.fn(),
    setIsAdmin: jest.fn(),
};

