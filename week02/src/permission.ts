type Permission = 'read' | 'write' | 'delete';

type Role = 'guest' | 'user' | 'admin';

type RolePermissions = Record<Role,Permission[]>;

const permissions: RolePermissions = {
  guest: ['read'],
  user: ['read', 'write'],
  admin: ['read', 'write', 'delete'],
};

interface Usered {
  id: number;
  name: string;
  email: string;
  role: Role;
  password: string;
  createdAt: string;
}

type PublicUser = Pick<Usered,"id"|"name"|"email"|"role">;

type AdminViewUser = Omit<Usered,"email"|"password">;
