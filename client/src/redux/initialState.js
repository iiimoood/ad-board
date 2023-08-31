const initialState = {
  ads: [
    {
      id: '1',
      title: 'Test test',
      content: 'Test test test test',
      dateOfPublication: new Date('02-02-2022'),
      photo: 'http://localhost:8000/uploads/avatar-1692983443878.png',
      price: 12,
      location: 'Poland',
      seller: {
        login: 'JohnDoe',
        avatar: 'http://localhost:8000/uploads/avatar-1692960385283.png',
        phone: '444444444',
      },
    },
  ],
  users: [],
};

export default initialState;
