const initialState = {
  ads: [
    {
      id: '1',
      title: 'Test test',
      content: 'Test test test test',
      dateOfPublication: '01.03.2020',
      photo: 'public/uploads/avatar-1692983443878.png',
      price: 12,
      location: 'Poland',
      seller: {
        login: 'JohnDoe',
        avatar: 'public/uploads/avatar-1692960385283.png',
        phone: '444444444',
      },
    },
  ],
  users: [],
};

export default initialState;
