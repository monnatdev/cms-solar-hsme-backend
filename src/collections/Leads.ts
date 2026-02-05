import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';

/**
 * Hook to sanitize phone number before validation
 * Removes spaces, dashes, and other formatting characters
 */
const sanitizePhoneHook = ({ data }: any) => {
  if (data?.phone) {
    // Remove spaces, dashes, parentheses, and other common phone formatting
    data.phone = data.phone.replace(/[\s\-()]/g, '');
  }
  return data;
};

/**
 * Hook to log new lead submissions
 * Logs after a lead is successfully created
 */
const logLeadHook = async ({ doc, operation }: any) => {
  if (operation === 'create') {
    console.log('New lead received:', {
      id: doc.id,
      fullName: doc.fullName,
      phone: doc.phone,
      email: doc.email,
      createdAt: doc.createdAt,
    });
  }
};

const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'phone', 'email', 'createdAt'],
    description: 'Contact leads from website forms - Read-only for admins',
  },
  access: {
    read: () => true, // Allow all
    create: () => true, // Public can create via API
    update: () => false, // No updates allowed
    delete: () => false, // No deletion allowed
  },
  hooks: {
    beforeValidate: [sanitizePhoneHook],
    afterChange: [logLeadHook],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      minLength: 2,
      maxLength: 100,
      label: 'Full Name',
      admin: {
        description: 'Full name of the lead (2-100 characters)',
        readOnly: true, // Read-only in admin panel
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
      validate: (val: string) => {
        // Validate phone number format (9-10 digits)
        if (!/^[0-9]{9,10}$/.test(val)) {
          return 'เบอร์โทรศัพท์ไม่ถูกต้อง (ต้องเป็นตัวเลข 9-10 หลัก)';
        }
        return true;
      },
      admin: {
        description: 'Phone number (9-10 digits, auto-sanitized)',
        readOnly: true, // Read-only in admin panel
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
      admin: {
        description: 'Email address of the lead',
        readOnly: true, // Read-only in admin panel
      },
    },
  ],
  timestamps: true, // Automatically add createdAt and updatedAt fields
};

export default Leads;
