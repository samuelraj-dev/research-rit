import { Request, Response, NextFunction } from 'express';
import { UserSession } from '../types/UserSession';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { role } from '../db/schema';
import { logger } from '../utils/logger';

export const checkPermissions = (requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    logger.info(req.body);
    
    const user: UserSession | null | undefined = req.session.user;
    if (!user) {
      res.status(401).json({ message: 'unauthorized' });
      return;
    }

    if (!user.permissions) {
      const result = await db.select().from(role).where(eq(role.id, user.roleId)).limit(1);
      if (result.length > 0) {
        user.permissions = result[0]?.permissions ? result[0]?.permissions : [];
      } else {
        res.status(403).json({ message: 'forbidden' });
        return;
      }
    }

    const hasPermission = requiredPermissions.every(permission =>
      user.permissions.includes(permission)
    );

    if (!hasPermission) {
      res.status(403).json({ message: 'forbidden' });
      return;
    }

    next();
  };
};
