const mockUsers: User[] = [
  {
    $id: 'user1',
    email: 'johndoe@example.com',
    userId: 'u1',
    firstName: 'John',
    lastName: 'Doe',
    address1: '123 Main St',
    postalCode: '12345',
    dateOfBirth: '1990-01-01',
    phoneNumber: '123-456-7890'
  },
  {
    $id: 'user2',
    email: 'janedoe@example.com',
    userId: 'u2',
    firstName: 'Jane',
    lastName: 'Doe',
    address1: '456 Elm St',
    postalCode: '67890',
    dateOfBirth: '1985-05-15',
    phoneNumber: '098-765-4321'
  }
];

const generateMockParticipation = (index: number): Participation => {
  const userIndex = index % mockUsers.length;
  const pending = index % 2 === 0;
  const participationDate = `2024-07-${String(index + 1).padStart(2, '0')}`;
  const submissionDate = `2024-07-${String(index + 15).padStart(2, '0')}`;
  const createdAt = `2024-07-${String(index + 1).padStart(2, '0')}T10:00:00Z`;

  const statuses: Array<"En Attente" | "Remis" | "Non Remis" | "Annule"> = ["En Attente", "Remis", "Non Remis", "Annule"];
  const status = statuses[index % statuses.length];

  return {
    id: `participation${index + 1}`,
    $id: `p${index + 1}`,
    name: `Participation ${index + 1}`,
    user: mockUsers[userIndex],
    type: `type${(index % 4) + 1}`,
    accountId: `account${index + 1}`,
    pending: pending,
    status: status,
    participationDate: participationDate,
    submissionDate: submissionDate,
    $createdAt: createdAt
  };
};

const mockParticipations: Participation[] = [];
for (let i = 0; i < 30; i++) {
  mockParticipations.push(generateMockParticipation(i));
}

// const mockParticipations: Participation[] = [
//   {
//     id: 'participation1',
//     $id: 'p1',
//     name: 'Participation 1',
//     user: mockUsers[0],
//     type: 'type1',
//     accountId: 'account1',
//     pending: true,
//     status: 'pending',
//     participationDate: '2024-01-01',
//     submissionDate: '2024-01-15',
//     $createdAt: '2024-01-01T10:00:00Z'
//   },
//   {
//     id: 'participation2',
//     $id: 'p2',
//     name: 'Participation 2',
//     user: mockUsers[1],
//     type: 'type2',
//     accountId: 'account2',
//     pending: false,
//     status: 'approved',
//     participationDate: '2024-02-01',
//     submissionDate: '2024-02-15',
//     $createdAt: '2024-02-01T11:00:00Z'
//   },
//   {
//     id: 'participation3',
//     $id: 'p3',
//     name: 'Participation 3',
//     user: mockUsers[0],
//     type: 'type3',
//     accountId: 'account3',
//     pending: true,
//     status: 'pending',
//     participationDate: '2024-01-01',
//     submissionDate: '2024-01-15',
//     $createdAt: '2024-01-01T10:00:00Z'
//   },
//   {
//     id: 'participation4',
//     $id: 'p4',
//     name: 'Participation 4',
//     user: mockUsers[1],
//     type: 'type4',
//     accountId: 'account4',
//     pending: false,
//     status: 'approved',
//     participationDate: '2024-02-01',
//     submissionDate: '2024-02-15',
//     $createdAt: '2024-02-01T11:00:00Z'
//   }
// ];

// Exporter les données fictives pour les utiliser dans les tests
export { mockUsers, mockParticipations };
