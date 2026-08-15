import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { db, adminUsers } from '@/db';
import { eq } from 'drizzle-orm';
import { generateId } from './utils';
import { AdminSession } from '@/types';
import { COOKIE_KEYS } from './constants';

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Hash password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify password
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Create admin session
 */
export async function createSession(username: string): Promise<AdminSession> {
  const session: AdminSession = {
    id: generateId('session'),
    username,
    expiresAt: Date.now() + SESSION_DURATION,
  };

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_KEYS.ADMIN_SESSION, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });

  return session;
}

/**
 * Get current session
 */
export async function getSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_KEYS.ADMIN_SESSION);

    if (!sessionCookie?.value) {
      return null;
    }

    const session: AdminSession = JSON.parse(sessionCookie.value);

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      await deleteSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Delete session (logout)
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEYS.ADMIN_SESSION);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

/**
 * Require authentication (throw error if not authenticated)
 */
export async function requireAuth(): Promise<AdminSession> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

/**
 * Login admin user
 */
export async function loginAdmin(username: string, password: string): Promise<{
  success: boolean;
  error?: string;
  session?: AdminSession;
}> {
  try {
    // Find admin user
    const admin = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.username, username),
    });

    if (!admin) {
      return {
        success: false,
        error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
      };
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.passwordHash);

    if (!isValid) {
      return {
        success: false,
        error: 'اسم المستخدم أو كلمة المرور غير صحيحة',
      };
    }

    // Create session
    const session = await createSession(admin.username);

    return {
      success: true,
      session,
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'حدث خطأ أثناء تسجيل الدخول',
    };
  }
}

/**
 * Logout admin user
 */
export async function logoutAdmin(): Promise<void> {
  await deleteSession();
}

/**
 * Create admin user (for initial setup)
 */
export async function createAdminUser(username: string, password: string): Promise<{
  success: boolean;
  error?: string;
  adminId?: string;
}> {
  try {
    // Check if admin already exists
    const existingAdmin = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.username, username),
    });

    if (existingAdmin) {
      return {
        success: false,
        error: 'اسم المستخدم موجود بالفعل',
      };
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create admin
    const [admin] = await db.insert(adminUsers).values({
      id: generateId('admin'),
      username,
      passwordHash,
    }).returning();

    return {
      success: true,
      adminId: admin.id,
    };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return {
      success: false,
      error: 'حدث خطأ أثناء إنشاء المستخدم',
    };
  }
}

/**
 * Change admin password
 */
export async function changeAdminPassword(
  username: string,
  oldPassword: string,
  newPassword: string
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Find admin user
    const admin = await db.query.adminUsers.findFirst({
      where: eq(adminUsers.username, username),
    });

    if (!admin) {
      return {
        success: false,
        error: 'المستخدم غير موجود',
      };
    }

    // Verify old password
    const isValid = await verifyPassword(oldPassword, admin.passwordHash);

    if (!isValid) {
      return {
        success: false,
        error: 'كلمة المرور الحالية غير صحيحة',
      };
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password
    await db
      .update(adminUsers)
      .set({ passwordHash: newPasswordHash })
      .where(eq(adminUsers.id, admin.id));

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error changing password:', error);
    return {
      success: false,
      error: 'حدث خطأ أثناء تغيير كلمة المرور',
    };
  }
}

/**
 * Check if any admin exists (for initial setup)
 */
export async function hasAdminUsers(): Promise<boolean> {
  try {
    const admin = await db.query.adminUsers.findFirst();
    return admin !== undefined;
  } catch (error) {
    console.error('Error checking admin users:', error);
    return false;
  }
}
