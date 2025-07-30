import express from 'express'; // Ensures the file is treated as a module
import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user: User; // Add your custom property here
    }
  }
}
