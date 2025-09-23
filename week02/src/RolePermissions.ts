// RolePermissions.ts

type Permission = 'read' | 'write' | 'delete';
type Role = 'guest' | 'user' | 'admin';

// Record 활용
type RolePermissions = Record<Role, Permission[]>;

const permissions: RolePermissions = {
  guest: ['read'],
  user: ['read', 'write'],
  admin: ['read', 'write', 'delete'],
};

interface User4 {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt: string;
}

// Pick 활용
type PublicUser = Pick<User4, 'id' | 'name' | 'email' | 'role'>;

// Omit 활용
type AdminViewUser = Omit<User4, 'email' | 'password'>;
