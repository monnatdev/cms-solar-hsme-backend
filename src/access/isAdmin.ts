import { Access } from 'payload/types';

/**
 * Access control function to check if user is authenticated (admin)
 * Returns true if user is logged in, false otherwise
 */
export const isAdmin: Access = ({ req: { user } }) => {
  // Log for debugging
  console.log('isAdmin check - User:', user ? 'authenticated' : 'not authenticated');
  
  // Return true if user exists (is authenticated)
  // Any authenticated user is considered an admin
  return Boolean(user);
};

/**
 * Access control function for public read access
 * Always returns true to allow anyone to read
 */
export const isPublic: Access = () => {
  return true;
};
