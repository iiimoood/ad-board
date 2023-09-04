const initialState = {
  ads: [
    {
      id: '1',
      title: 'Test test',
      content: 'Test test test test',
      dateOfPublication: new Date('02-02-2022'),
      photo: '/avatar-1692983443878.png',
      price: 12,
      location: 'Poland',
      seller: {
        login: 'JohnDoe',
        avatar: '/avatar-1692960385283.png',
        phone: '444444444',
      },
    },
  ],
  user: null,
};

export default initialState;
